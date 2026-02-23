/**
 * lingo.ts — Core i18n layer for the App Shell
 *
 * Two-layer architecture:
 *  1. PRIMARY: Synchronous lookup from pre-baked locale JSON dictionaries.
 *  2. FALLBACK: LingoDotDevEngine for any key not found in the target locale dict.
 *
 * GenUI (C1) content is NEVER translated here — C1 regenerates per locale.
 */

// Note: LingoDotDevEngine is now used server-side only in /api/lingo/fallback
// to prevent jsdom/node-modules from entering the client-side bundle.

// ─── Types ────────────────────────────────────────────────────────────────────

export type Locale = "en" | "de" | "ar" | "ur";

export interface I18nConfig {
  defaultLocale: Locale;
  fallbackLocale: Locale;
}

// ─── Config ───────────────────────────────────────────────────────────────────

export const I18N_CONFIG: I18nConfig = {
  defaultLocale: "en",
  fallbackLocale: "en",
};

export const SUPPORTED_LOCALES: { code: Locale; nativeName: string; englishName: string }[] = [
  { code: "en", nativeName: "English", englishName: "English" },
  { code: "de", nativeName: "Deutsch", englishName: "German" },
  { code: "ar", nativeName: "العربية", englishName: "Arabic" },
  { code: "ur", nativeName: "اردو", englishName: "Urdu" },
];

export const LOCAL_STORAGE_LOCALE_KEY = "app_locale";


// ─── Translation Cache ────────────────────────────────────────────────────────
// Two-tier: in-memory Map (fast) + localStorage (cross-session).
// Only SDK-fetched translations are cached; JSON-backed ones are always fresh.

const runtimeCache = new Map<string, string>();

function getCacheKey(text: string, locale: Locale): string {
  return `lingo:${locale}:${text}`;
}

function readCache(text: string, locale: Locale): string | null {
  const key = getCacheKey(text, locale);
  if (runtimeCache.has(key)) return runtimeCache.get(key)!;
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(key);
    if (stored) {
      runtimeCache.set(key, stored); // warm in-memory cache
      return stored;
    }
  }
  return null;
}

function writeCache(text: string, locale: Locale, translated: string): void {
  const key = getCacheKey(text, locale);
  runtimeCache.set(key, translated);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(key, translated);
    } catch {
      // localStorage quota exceeded — in-memory cache still serves requests
    }
  }
}

// ─── Dot-path Nested Key Resolver ────────────────────────────────────────────

/**
 * Resolves a dot-notation key path in a nested object.
 * Example: resolvePath({ toolbar: { undo: "Undo" } }, "toolbar.undo") → "Undo"
 */
export function resolvePath(obj: Record<string, unknown>, path: string): string | null {
  const segments = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;
  for (const seg of segments) {
    if (current === null || typeof current !== "object") return null;
    current = current[seg];
  }
  if (typeof current === "string") return current;
  return null;
}

// ─── Primary Dictionary Lookup (synchronous) ─────────────────────────────────

/**
 * Resolves a translation key synchronously using locale JSON dictionaries.
 *
 * Resolution order:
 *  1. Target locale JSON
 *  2. English fallback JSON
 *  3. null (key not found in any dict)
 */
export function resolveFromDict(
  key: string,
  locale: Locale,
  dicts: Record<Locale, Record<string, unknown>>
): string | null {
  const targetDict = dicts[locale];
  if (targetDict) {
    const result = resolvePath(targetDict as Record<string, unknown>, key);
    if (result !== null) return result;
  }
  // English fallback
  const enDict = dicts["en"];
  if (enDict) {
    const result = resolvePath(enDict as Record<string, unknown>, key);
    if (result !== null) return result;
  }
  return null;
}

// ─── SDK Runtime Fallback (async, cached) ────────────────────────────────────

/**
 * Falls back to the Lingo SDK for any key whose English value could not be
 * found in any pre-baked dictionary. Results are cached to avoid re-fetching.
 *
 * NOTE: This is a last-resort escape hatch. In normal operation the JSON
 * dictionaries should cover all app-shell keys.
 */
/**
 * Falls back to our server-side Lingo proxy for any key not found in dictionaries.
 * Results are cached in localStorage to avoid redundant API calls.
 */
export async function resolveFromSDK(
  englishText: string,
  targetLocale: Locale
): Promise<string> {
  if (targetLocale === "en") return englishText;

  const cached = readCache(englishText, targetLocale);
  if (cached) return cached;

  try {
    const response = await fetch("/api/lingo/fallback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: englishText, targetLocale }),
    });

    if (!response.ok) throw new Error("Fallback failed");

    const data = await response.json();
    const result = data.translated ?? englishText;

    writeCache(englishText, targetLocale, result);
    return result;
  } catch (error) {
    console.warn("[i18n] Fallback translation failed:", error);
    return englishText;
  }
}

// ─── Locale Persistence ───────────────────────────────────────────────────────

export function persistLocale(locale: Locale): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LOCAL_STORAGE_LOCALE_KEY, locale);
  }
}

export function loadPersistedLocale(): Locale {
  if (typeof window === "undefined") return I18N_CONFIG.defaultLocale;
  const stored = window.localStorage.getItem(LOCAL_STORAGE_LOCALE_KEY) as Locale | null;
  const supported = SUPPORTED_LOCALES.map((l) => l.code);
  if (stored && supported.includes(stored)) return stored;
  return I18N_CONFIG.defaultLocale;
}

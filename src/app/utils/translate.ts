/**
 * translate.ts — App Shell translation utility
 *
 * ARCHITECTURE RULE:
 *  - This file is ONLY for the App Shell layer (toolbar, buttons, empty states, etc.).
 *  - GenUI (C1) content is NEVER translated here. C1 regenerates per locale.
 *  - deepTranslateObject has been intentionally removed.
 *
 * Key format: nested dot-path notation
 *  - "toolbar.undo"  →  translations[locale]["toolbar"]["undo"]
 *  - "modal.confirmDelete.title" → translations[locale]["modal"]["confirmDelete"]["title"]
 *
 * Fallback chain:
 *  1. Target locale dictionary
 *  2. English dictionary (en.json)
 *  3. Return the raw key string (never throws)
 */

import en from "../../../locales/en.json";
import de from "../../../locales/de.json";
import ar from "../../../locales/ar.json";
import ur from "../../../locales/ur.json";
import { resolvePath, persistLocale, loadPersistedLocale } from "@/i18n/lingo";

// ─── Locale Types ─────────────────────────────────────────────────────────────

export type Locale = "en" | "de" | "ar" | "ur";

export const SUPPORTED_LOCALES: { code: Locale; label: string; nativeLabel: string }[] = [
    { code: "en", label: "English", nativeLabel: "English" },
    { code: "de", label: "German", nativeLabel: "Deutsch" },
    { code: "ar", label: "Arabic", nativeLabel: "العربية" },
    { code: "ur", label: "Urdu", nativeLabel: "اردو" },
];

// ─── Dictionary Map ───────────────────────────────────────────────────────────

type LocaleDict = Record<string, unknown>;

const translations: Record<Locale, LocaleDict> = {
    en: en as LocaleDict,
    de: de as LocaleDict,
    ar: ar as LocaleDict,
    ur: ur as LocaleDict,
};

// ─── Core Resolver ────────────────────────────────────────────────────────────

/**
 * Translate a dot-path key synchronously.
 *
 * Resolution order:
 *   1. Target locale dictionary (nested key lookup)
 *   2. English fallback dictionary
 *   3. The raw key string (silent graceful degradation)
 *
 * @param key    Dot-path key, e.g. "toolbar.undo"
 * @param locale Target locale
 * @returns      Translated string or the key itself if not found
 */
export function translate(key: string, locale: Locale): string {
    // 1. Try the exact target locale
    const targetDict = translations[locale];
    if (targetDict) {
        const result = resolvePath(targetDict as Record<string, unknown>, key);
        if (result !== null) return result;
    }

    // 2. English fallback
    if (locale !== "en") {
        const enResult = resolvePath(translations["en"] as Record<string, unknown>, key);
        if (enResult !== null) return enResult;
    }

    // 3. Return the key itself (graceful degradation — never throws)
    console.warn(`[i18n] Missing translation key: "${key}" for locale "${locale}"`);
    return key;
}

// ─── Locale Persistence Helpers (re-exported for convenience) ─────────────────

export { persistLocale, loadPersistedLocale };

// ─── RTL Note ─────────────────────────────────────────────────────────────────
// RTL logic has been intentionally removed from this architecture.
// Per requirements: no RTL implementation.

/**
 * useGenUILocale.ts — Locale-aware C1 GenUI Regeneration Hook
 *
 * SEPARATION RULE:
 *  GenUI is NEVER translated via lingo. When the user switches locale,
 *  C1 regenerates the component in the new language from scratch.
 *
 * This hook:
 *  1. Listens for LOCALE_CHANGE_EVENT dispatched by LocaleContext
 *  2. Calls the provided onLocaleChange callback with the new locale
 *  3. Component decides whether/how to trigger C1 regeneration
 *
 * Usage in C1 shape components that want to regenerate on locale change:
 *
 *   useGenUILocale((locale) => {
 *     // Re-trigger the C1 API call with the current prompt + new locale
 *     regenerateWithLocale(locale);
 *   });
 */

"use client";

import { useEffect } from "react";
import { LOCALE_CHANGE_EVENT } from "@/app/context/LocaleContext";
import type { Locale } from "@/app/utils/translate";

type LocaleChangeHandler = (locale: Locale) => void;

/**
 * Subscribes to app-level locale change events.
 * Safe to use in any client component. Cleans up automatically on unmount.
 *
 * @param onLocaleChange  Callback fired whenever the user switches locale.
 *                        Receives the new locale code.
 */
export function useGenUILocale(onLocaleChange: LocaleChangeHandler): void {
    useEffect(() => {
        const handler = (event: Event) => {
            const customEvent = event as CustomEvent<{ locale: Locale }>;
            if (customEvent.detail?.locale) {
                onLocaleChange(customEvent.detail.locale);
            }
        };

        window.addEventListener(LOCALE_CHANGE_EVENT, handler);
        return () => window.removeEventListener(LOCALE_CHANGE_EVENT, handler);
    }, [onLocaleChange]);
}

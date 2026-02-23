"use server";

import { lingo } from "@/lib/lingo";
import { type Locale } from "@/app/utils/translate";

export async function fetchLingoTranslation(key: string, locale: string): Promise<string> {
    try {
        const text = await lingo.localizeText(key, { sourceLocale: "en", targetLocale: locale as Locale });
        return text;
    } catch (e) {
        console.error("Lingo translation error:", e);
        return key;
    }
}

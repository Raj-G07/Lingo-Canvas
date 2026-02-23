"use server";

import { lingo } from "@/lib/lingo";

export async function fetchLingoTranslation(key: string, locale: string): Promise<string> {
    try {
        const text = await lingo.localizeText(key, { sourceLocale: "en", targetLocale: locale as any });
        return text;
    } catch (e) {
        console.error("Lingo translation error:", e);
        return key;
    }
}

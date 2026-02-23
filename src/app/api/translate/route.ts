import { NextRequest, NextResponse } from "next/server";
import { LingoDotDevEngine } from "lingo.dev/sdk";

const lingo = new LingoDotDevEngine({
    apiKey: process.env.LINGODOTDEV_API_KEY as string,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { key, locale } = body;

        if (!key || !locale) {
            return NextResponse.json({ error: "Missing key or locale" }, { status: 400 });
        }

        const text = await lingo.localizeText(key, { sourceLocale: "en", targetLocale: locale });
        console.log(`Lingotext: ${text}`);
        return NextResponse.json({ text });
    } catch (e: any) {
        console.error("Lingo API Route Translation Error:", e);
        return NextResponse.json({ error: e.message || "Translation failed" }, { status: 500 });
    }
}

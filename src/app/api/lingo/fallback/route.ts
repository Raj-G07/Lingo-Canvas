import { NextRequest, NextResponse } from "next/server";
import { LingoDotDevEngine } from "lingo.dev/sdk";

export async function POST(req: NextRequest) {
    try {
        const { text, targetLocale } = await req.json();

        if (!text || !targetLocale) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        const engine = new LingoDotDevEngine({
            apiKey: process.env.LINGODOTDEV_API_KEY ?? "",
        });

        const translated = await engine.localizeText(text, {
            sourceLocale: "en",
            targetLocale,
        });

        return NextResponse.json({ translated });
    } catch (error) {
        console.error("[Lingo Fallback Error]", error);
        return NextResponse.json({ error: "Translation failed" }, { status: 500 });
    }
}

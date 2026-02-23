"use client";

import React, { useRef } from "react";
import { useLocale } from "@/app/context/LocaleContext";
import { SUPPORTED_LOCALES, type Locale } from "@/app/utils/translate";

export function LanguageSwitcher() {
    const { locale, setLocale, t, supportedLocales } = useLocale();
    const selectRef = useRef<HTMLSelectElement>(null);

    return (
        <div
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 shadow-sm transition-all hover:border-gray-300"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            <span className="text-sm grayscale opacity-70" role="img" aria-hidden="true">
                🌐
            </span>
            <select
                ref={selectRef}
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                className="text-sm font-medium border-none bg-transparent text-gray-800 cursor-pointer outline-none p-0 pr-1 capitalize"
                aria-label={t("language.selector.label")}
            >
                {supportedLocales.map(({ code, nativeLabel }) => (
                    <option key={code} value={code}>
                        {nativeLabel}
                    </option>
                ))}
            </select>
        </div>
    );
}

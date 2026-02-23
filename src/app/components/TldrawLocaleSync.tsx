"use client";

import { useEffect } from "react";
import { useEditor } from "tldraw";
import { useLocale } from "@/app/context/LocaleContext";

/**
 * TldrawLocaleSync — Reactive Sync for tldraw language
 * 
 * This component must be rendered inside the <Tldraw> context.
 * It listens to the global LocaleContext and updates the editor's
 * user preferences whenever the locale changes.
 */
export function TldrawLocaleSync() {
    const editor = useEditor();
    const { locale } = useLocale();

    useEffect(() => {
        // Sync the tldraw internal locale with our global app locale
        editor.user.updateUserPreferences({
            locale,
        });
    }, [editor, locale]);

    return null;
}

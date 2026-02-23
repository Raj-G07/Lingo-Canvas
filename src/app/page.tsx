"use client";

import { useEffect } from "react";
import "@crayonai/react-ui/styles/index.css";
import "tldraw/tldraw.css";
import { DefaultToolbar, Tldraw, type TLUiComponents, type TLUiOverrides } from "tldraw";
import { shapeUtils } from "./shapeUtils";
import { PromptInput } from "./components/PromptInput";
import { C1SelectionUI } from "./components/C1SelectionUI";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { HotkeysProvider } from "react-hotkeys-hook";
import { FOCUS_PROMPT_EVENT } from "./events";
import { useLocale } from "@/app/context/LocaleContext";

import { TldrawLocaleSync } from "./components/TldrawLocaleSync";

const components: Partial<TLUiComponents> = {
  Toolbar: () => {
    return (
      <div style={{ position: "absolute", top: 8 }}>
        <DefaultToolbar />
      </div>
    );
  },
};

const overrides: TLUiOverrides = {
  actions: (_editor, actions) => {
    return {
      ...actions,
      "focus-prompt-input": {
        id: "focus-prompt-input",
        label: "Focus Prompt Input",
        kbd: "$k",
        onSelect: () => {
          // Dispatch custom event to focus the prompt input
          window.dispatchEvent(new CustomEvent(FOCUS_PROMPT_EVENT));
        },
      },
    };
  },
};

const Page = () => {
  const { t } = useLocale();
  useEffect(() => {
    // Handle system color scheme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      // Only apply system preference if no explicit theme is set (auto mode)
      if (!document.documentElement.hasAttribute("data-theme")) {
        // The CSS media query will automatically handle the variable updates
        // We just need to ensure tldraw is notified if needed
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return (
    <HotkeysProvider>
      <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden">
        <header className="flex-none px-4 py-3 bg-white border-b border-gray-200 flex justify-between items-center relative z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none" className="w-8 h-8">
              <path d="M472 80L135 250L400 450Z" fill="#F43F5E" />
              <path d="M472 80L80 160L135 250Z" fill="#FACC15" />
              <path d="M135 250L80 160L100 370Z" fill="#38BDF8" />
              <path d="M135 250L100 370L400 450Z" fill="#0EA5E9" />
            </svg>
            <span className="font-bold text-xl text-gray-800 tracking-tight">{t("app.title")}</span>
          </div>
          <LanguageSwitcher />
        </header>
        <main className="flex-1 relative">
          <div style={{ position: "absolute", inset: 0 }}>
            <Tldraw
              shapeUtils={shapeUtils}
              components={components}
              overrides={overrides}
              onMount={(editor) => {
                // Set initial color scheme based on editor settings
                const colorScheme = editor.user.getUserPreferences().colorScheme;
                if (colorScheme === "dark") {
                  document.documentElement.setAttribute("data-theme", "dark");
                } else if (colorScheme === "light" || !colorScheme) {
                  document.documentElement.setAttribute("data-theme", "light");
                } else if (colorScheme === "system") {
                  // Remove data-theme attribute to allow system preference to take effect
                  document.documentElement.removeAttribute("data-theme");
                }
              }}
              onUiEvent={(event, eventData) => {
                if (event === "color-scheme") {
                  const { value: mode } = eventData as {
                    value: "light" | "dark" | "system" | undefined;
                  };
                  if (mode === "dark") {
                    document.documentElement.setAttribute("data-theme", "dark");
                  } else if (mode === "light" || !mode) {
                    // Default to light theme if mode is undefined
                    document.documentElement.setAttribute("data-theme", "light");
                  } else if (mode === "system") {
                    // Remove data-theme attribute to allow system preference to take effect
                    document.documentElement.removeAttribute("data-theme");
                  }
                }
              }}
              persistenceKey="c1-canvas"
            >
              <TldrawLocaleSync />
              <PromptInput focusEventName={FOCUS_PROMPT_EVENT} />
              <C1SelectionUI />
            </Tldraw>
          </div>
        </main>
      </div>
    </HotkeysProvider>
  );
};

export default Page;

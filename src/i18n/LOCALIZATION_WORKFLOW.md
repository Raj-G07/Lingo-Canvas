# Localization Workflow Guide

## Architecture Overview

This project uses a **Two-Layer Localization Architecture** for strict separation of concerns and optimal user experience.

| Layer | Responsibility | Technology | Strategy |
| :--- | :--- | :--- | :--- |
| **App Shell** | Static UI (Buttons, Menus, Labels) | `lingo.dev` SDK | Key-based translation using local JSON dictionaries. |
| **GenUI** | Dynamic AI Content (C1 Components) | `Thesys C1` | Prompt-based regeneration in the target locale. |

## Team Workflow (CLI Limitations)

Currently, `npx lingo extract` and `npx lingo sync` are bypassed due to project-specific constraints. Follow this manual workflow:

### 1. Adding a New Translation Key
1. Open [en.json](../../locales/en.json).
2. Add the key using **nested dot-notation namespaces**.
   ```json
   "settings": {
     "advanced": {
       "title": "Advanced Settings"
     }
   }
   ```
3. Copy the path to other locale files (e.g., [de.json](../../locales/de.json)) and provide translations.
4. Use the `t()` hook in your component: `t("settings.advanced.title")`.

### 2. Manual Translation Strategy
If a translation is missing in the target locale JSON:
- The system automatically falls back to the **English dictionary**.
- If still missing, it attempts a **runtime translation** via the `lingo.dev` SDK (results are cached in `localStorage`).
- If all fails, the raw key path is displayed to developers for easy debugging.

## Rules of the Road

> [!IMPORTANT]
> **GenUI Separation**: NEVER wrap GenUI content (C1 responses) in `t()` or pass it to `lingo.dev` SDK helpers. GenUI must be regenerated via C1 by passing the `locale` in the `makeApiCall` context.

> [!TIP]
> **RTL Support**: Per current scope, RTL (Right-to-Left) logic is intentionally disabled. Content will render in LTR layout for all languages.

> [!NOTE]
> **Persistence**: The user's locale preference is stored in `localStorage` and restored on page load. Auto-detection is disabled to give users full control.

## Verification Checklist
- [ ] Run `npm run build` to ensure no broken imports or type errors.
- [ ] Check `localStorage` for the `app_locale` key after switching languages.
- [ ] Verify that GenUI components re-render with fresh AI content when the locale changes.
- [ ] Ensure `console.warn` appears for any missing keys during development.

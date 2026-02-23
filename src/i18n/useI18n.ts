/**
 * useI18n.ts — Public hook for App Shell localization
 *
 * Usage in any client component:
 *   import { useI18n } from "@/i18n/useI18n";
 *   const { t, locale, setLocale } = useI18n();
 *   <button>{t("button.save")}</button>
 *
 * GenUI components must NOT use this hook.
 * GenUI content is generated natively by C1 per locale.
 */

export { useLocale as useI18n } from "@/app/context/LocaleContext";

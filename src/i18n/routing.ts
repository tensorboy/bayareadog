import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh", "es", "ja", "ko", "fr", "de", "pt", "it", "ru", "ar", "hi", "th", "vi", "id"],
  defaultLocale: "en",
});

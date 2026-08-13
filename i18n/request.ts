import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  let locale: (typeof routing.locales)[number] = routing.defaultLocale;
  if (requested && (routing.locales as readonly string[]).includes(requested)) {
    locale = requested as (typeof routing.locales)[number];
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

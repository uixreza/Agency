/**
 * Converts a number to Persian (Farsi) digits
 * @param num - The number to convert
 * @returns The number as a Persian numeral string
 */
export function toPersianNum(num: number): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

/**
 * Converts a number to the digits of the given locale
 * - "fa": Persian digits (۱۲۳)
 * - other locales: Latin digits (123)
 * @param num - The number to convert
 * @param locale - The locale string (e.g. "fa", "en", "tr")
 * @returns The number as a locale-localized string
 */
export function toLocalDigits(num: number, locale: string): string {
  if (locale === "fa") return toPersianNum(num);
  return num.toLocaleString("en-US");
}
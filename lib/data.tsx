export interface PortfolioItem {
  id: number;
  title: string;
  category: "seo" | "ads" | "social" | "web";
  result: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface ServiceCategory {
  value: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  content: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    title: "فروشگاه آنلاین مدیس",
    category: "web",
    result: "+۲۸۰% فروش",
    image: "linear-gradient(135deg, #00e5cc 0%, #00b8a3 100%)",
  },
  {
    id: 2,
    title: "کمپین سئو تکنولند",
    category: "seo",
    result: "رتبه ۱ گوگل",
    image: "linear-gradient(135deg, #ff6b4a 0%, #ff4757 100%)",
  },
  {
    id: 3,
    title: "تبلیغات استارتاپ فین",
    category: "ads",
    result: "ROAS ۴.۵x",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 4,
    title: "اینستاگرام کافه نوین",
    category: "social",
    result: "+۵۰K فالوور",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 5,
    title: "طراحی سایت بیمارستان",
    category: "web",
    result: "+۱۵۰% نوبت‌دهی",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: 6,
    title: "سئو سایت خبری",
    category: "seo",
    result: "+۵۰۰% ترافیک",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

export const testimonialsData: Testimonial[] = [
  {
    name: "علی رضایی",
    role: "مدیرعامل شرکت تکنولند",
    text: "همکاری با نوین دیجیتال یکی از بهترین تصمیمات ما بود. در عرض ۶ ماه ترافیک سایت ما ۵ برابر شد و فروش‌ها به طرز چشمگیری افزایش یافت.",
    avatar: "AR",
  },
  {
    name: "مریم حسینی",
    role: "بنیان‌گذار فروشگاه مدیس",
    text: "تیم حرفه‌ای و متعهد. استراتژی سئو که برای ما تدوین کردند فوق‌العاده بود. الان در صفحه اول گوگل هستیم.",
    avatar: "MH",
  },
  {
    name: "محمد کریمی",
    role: "مدیر بازاریابی استارتاپ فین",
    text: "ROI کمپین‌های تبلیغاتی ما با مدیریت نوین دیجیتال ۳ برابر شد. واقعاً کارشان حرفه‌ای است.",
    avatar: "MK",
  },
  {
    name: "سارا احمدی",
    role: "مدیر برند کافه نوین",
    text: "محتوای اینستاگرام ما توسط تیم نوین تولید می‌شود. تعامل فالوورهایمان ۴ برابر شده است.",
    avatar: "SA",
  },
];

export const serviceCategories: ServiceCategory[] = [
  { value: "", label: "انتخاب کنید..." },
  { value: "seo", label: "سئو و بهینه‌سازی" },
  { value: "ads", label: "تبلیغات کلیکی" },
  { value: "social", label: "شبکه‌های اجتماعی" },
  { value: "web", label: "طراحی وب‌سایت" },
  { value: "email", label: "ایمیل مارکتینگ" },
  { value: "other", label: "سایر خدمات" },
];

export const categoryNames: Record<string, string> = {
  seo: "سئو",
  ads: "تبلیغات",
  social: "شبکه اجتماعی",
  web: "طراحی وب",
  email: "ایمیل مارکتینگ",
  other: "سایر",
};

export const navItems: NavItem[] = [
  { label: "خانه", href: "/" },
  { label: "خدمات", href: "/our-services" },
  { label: "نمونه کارها", href: "/our-works" },
  { label: "درباره ما", href: "#about" },
  { label: "تماس با ما", href: "#contact" },
];

export const statsData: StatItem[] = [
  { target: 523, suffix: "", label: "پروژه موفق" },
  { target: 98, suffix: "%", label: "رضایت مشتری" },
  { target: 8, suffix: " سال", label: "تجربه فعالیت" },
  { target: 25, suffix: "+", label: "متخصص حرفه‌ای" },
];

export const portfolioFilters = [
  { value: "all", label: "همه" },
  { value: "seo", label: "سئو" },
  { value: "ads", label: "تبلیغات" },
  { value: "social", label: "شبکه اجتماعی" },
  { value: "web", label: "طراحی وب" },
];

export const serviceFeatures = [
  {
    id: 1,
    icon: (
      <svg
        className="w-7 h-7 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    iconBg: "bg-accent/10",
    title: "سئو و بهینه‌سازی",
    description:
      "با تکنیک‌های پیشرفته سئو، سایت شما را به صفحه اول گوگل می‌آوریم و ترافیک ارگانیک را چند برابر کنید.",
    items: ["سئو تکنیکال", "تحقیقات کلمات کلیدی", "لینک‌سازی"],
    checkColor: "text-accent",
    link: "/our-services/seo",
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-7 h-7 text-warm"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </svg>
    ),
    iconBg: "bg-warm/10",
    title: "تبلیغات کلیکی",
    description:
      "مدیریت حرفه‌ای کمپین‌های گوگل ادز و شبکه‌های تبلیغاتی با بالاترین نرخ تبدیل و کمترین هزینه.",
    items: ["گوگل ادز", "ریمارکتینگ", "بهینه‌سازی نرخ تبدیل"],
    checkColor: "text-warm",
    link: "/our-services/ads",
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-7 h-7 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
    iconBg: "bg-accent/10",
    title: "شبکه‌های اجتماعی",
    description:
      "تولید محتوای خلاقانه و مدیریت حرفه‌ای حضور برند شما در تمام پلتفرم‌های اجتماعی.",
    items: ["اینستاگرام مارکتینگ", "لینکدین بیزینس", "تولید محتوا"],
    checkColor: "text-accent",
    link: "/our-services/social-media",
  },
  {
    id: 4,
    icon: (
      <svg
        className="w-7 h-7 text-warm"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    iconBg: "bg-warm/10",
    title: "طراحی وب‌سایت",
    description:
      "طراحی و توسعه وب‌سایت‌های مدرن، سریع و بهینه‌شده برای تبدیل بازدیدکننده به مشتری.",
    items: ["طراحی UI/UX", "فروشگاه آنلاین", "لندینگ پیج"],
    checkColor: "text-warm",
    link: "/our-services/web-design",
  },
  {
    id: 5,
    icon: (
      <svg
        className="w-7 h-7 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    iconBg: "bg-accent/10",
    title: "ایمیل مارکتینگ",
    description:
      "طراحی و اجرای کمپین‌های ایمیل هدفمند برای افزایش وفاداری مشتریان و فروش مجدد.",
    items: ["اتوماسیون ایمیل", "خبرنامه", "سگمنت مشتریان"],
    checkColor: "text-accent",
    link: "/our-services/email-marketing",
  },
  {
    id: 6,
    icon: (
      <svg
        className="w-7 h-7 text-warm"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    iconBg: "bg-warm/10",
    title: "تحلیل و گزارش",
    description:
      "تحلیل دقیق داده‌ها و ارائه گزارش‌های منظم برای شناسایی فرصت‌های رشد.",
    items: ["گوگل آنالیتیکس", "داشبورد اختصاصی", "گزارش ماهانه"],
    checkColor: "text-warm",
    link: "/our-services/analytics",
  },
];

export const contactInfoData = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    iconBg: "bg-accent/10",
    title: "آدرس دفتر",
    content: "تهران، خیابان ولیعصر، برج آسمان، طبقه ۱۲",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-warm"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    iconBg: "bg-warm/10",
    title: "ایمیل",
    content: "info@novindigital.ir",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    iconBg: "bg-accent/10",
    title: "تلفن",
    content: "۰۲۱-۱۲۳۴۵۶۷۸",
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "اینستاگرام",
    href: "https://instagram.com/novindigital",
    icon: "instagram",
  },
  {
    label: "لینکدین",
    href: "https://linkedin.com/company/novindigital",
    icon: "linkedin",
  },
  {
    label: "توییتر",
    href: "https://twitter.com/novindigital",
    icon: "twitter",
  },
  {
    label: "تلگرام",
    href: "https://t.me/novindigital",
    icon: "telegram",
  },
];

export const footerLinks = {
  services: [
    { label: "سئو و بهینه‌سازی", href: "/our-services/seo" },
    { label: "تبلیغات کلیکی", href: "/our-services/ads" },
    { label: "شبکه‌های اجتماعی", href: "/our-services/social-media" },
    { label: "طراحی وب‌سایت", href: "/our-services/web-design" },
    { label: "ایمیل مارکتینگ", href: "/our-services/email-marketing" },
  ],
  company: [
    { label: "درباره ما", href: "/about" },
    { label: "نمونه کارها", href: "/our-works" },
    { label: "وبلاگ", href: "/blog" },
    { label: "فرصت‌های شغلی", href: "/careers" },
  ],
  support: [
    { label: "تماس با ما", href: "/contact" },
    { label: "سوالات متداول", href: "/faq" },
    { label: "قوانین و مقررات", href: "/terms" },
    { label: "حریم خصوصی", href: "/privacy" },
  ],
};

export const trustBadges = [
  { label: "دیجی‌کالا", href: "#" },
  { label: "اسنپ", href: "#" },
  { label: "تپسی", href: "#" },
];

/**
 * Converts English numbers to Persian (Farsi) numbers
 * @param num - The number to convert
 * @returns The number as a Persian numeral string
 */
export function toPersianNum(num: number): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

/**
 * Formats a phone number for display
 * @param phone - The phone number string
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Iranian mobile format: 0912 123 4567
  if (cleaned.length === 11 && cleaned.startsWith("09")) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  // Landline format: 021 12345678
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  }

  return phone;
}

/**
 * Validates an Iranian phone number
 * @param phone - The phone number to validate
 * @returns Boolean indicating if the phone number is valid
 */
export function isValidIranianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");

  // Mobile: 09XX XXX XXXX
  if (/^09\d{9}$/.test(cleaned)) return true;

  // Landline: 0XX XXXXXXXX
  if (/^0[1-8]\d{9}$/.test(cleaned)) return true;

  return false;
}

/**
 * Converts Persian numbers to English numbers
 * @param str - String containing Persian numbers
 * @returns String with English numbers
 */
export function persianToEnglishNum(str: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d).toString());
}

/**
 * Formats a number with commas (Persian style)
 * @param num - The number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generates a random ID
 * @param length - Length of the ID
 * @returns Random string ID
 */
export function generateId(length: number = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

/**
 * Debounce function for performance optimization
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Smooth scroll to an element
 * @param elementId - The ID of the element to scroll to
 * @param offset - Offset from the top in pixels
 */
export function smoothScrollTo(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copied
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
}

/**
 * Check if the device is mobile
 * @returns Boolean indicating if the device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

/**
 * Get the current Persian/Jalali date
 * @returns Formatted Persian date string (optional - requires a Jalali date library)
 */
export function getPersianDate(): string {
  // This is a placeholder - for actual implementation, you'd need a library like moment-jalaali
  const now = new Date();
  return now.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export type Locale = 'en' | 'zh';

const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'zh'] as const;
export const DEFAULT_LOCALE: Locale = 'zh';

export function isValidLocale(locale: string): locale is Locale {
    return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

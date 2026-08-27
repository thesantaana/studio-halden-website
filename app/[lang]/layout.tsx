import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { Preloader } from "@/components/layout/preloader";
import Navbar from "@/components/layout/navbar";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getDictionary, getContents, getSharedData } from "@/lib/loaders";
import { BASE_PATH, IS_GITHUB_PAGES, withBasePath } from "@/lib/base-path";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isChinese = lang === "zh";
  const title = isChinese ? "MĒTIS — 独立设计工作室" : "MĒTIS — Independent Design Studio";
  const description = isChinese
    ? "一家专注于品牌识别、数字界面的设计工作室。"
    : "A design studio focused on brand identity and digital interfaces.";

  return {
    title,
    description,
    icons: { icon: withBasePath("/favicon.svg") },
    alternates: { languages: { "zh-CN": `${BASE_PATH}/zh/`, en: `${BASE_PATH}/en/` } },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isChinese ? "zh_CN" : "en_US",
    },
  };
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'zh' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const [dictionary, contents, shared] = await Promise.all([
    getDictionary(lang),
    getContents(lang),
    getSharedData(),
  ]);

  // Direction contract: MĒTIS uses a restrained charcoal, warm-white and bronze
  // archive world. Typography and supplied design imagery lead; motion sets pace.

  return (
    <html lang={lang} suppressHydrationWarning>
      {IS_GITHUB_PAGES && (
        <head>
          <link rel="canonical" href={`https://thesantaana.github.io${BASE_PATH}/${lang}/`} />
        </head>
      )}
      <body className={`${manrope.variable} ${syne.variable} font-sans bg-background text-foreground antialiased`}>
        <LanguageProvider lang={lang} dictionary={dictionary} contents={contents} shared={shared}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <Preloader />
            <SmoothScroll>
              <Navbar />
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "../globals.css";
import SmoothScroll from "@/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { Preloader } from "@/components/layout/preloader";
import { CustomCursor } from "@/components/layout/custom-cursor";
import Navbar from "@/components/layout/navbar";
import { isValidLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getDictionary, getContents, getSharedData } from "@/lib/loaders";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Studio Halden — Independent Design Studio",
  description: "Identity, digital experience and image-making by Studio Halden.",
};

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

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} font-sans bg-background text-foreground antialiased`}>
        <div hidden data-direction-seed="user-pinned:kintarowwwards@2026-08-26">
          THESIS: A kinetic studio folio where work, type, and motion lead; it refuses the centered agency hero and equal-card grid.
          OWN-WORLD: Monochrome fields, oversized Syne typography, fine rules, image rails, circular controls, and grayscale-to-color work reveals.
          STORY: Visitors identify an independent design studio, understand its capabilities, browse provisional work, learn the process, and start a conversation.
          FIRST VIEWPORT: Studio Halden fills the lower-left at monumental scale; copy and two actions sit beneath it; a vertical moving image rail occupies the right third.
          FORM: User-pinned Kintarowwwards adaptation, first choice; seed user-pinned:kintarowwwards@2026-08-26.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
        </div>
        <LanguageProvider lang={lang} dictionary={dictionary} contents={contents} shared={shared}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <CustomCursor />
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

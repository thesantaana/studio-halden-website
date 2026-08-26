import { Manrope, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { NotFoundContent } from "@/components/sections/not-found-content";
import enDict from "@/dictionaries/en.json";

const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata = {
  title: "404 | MĒTIS",
  description: "Page not found.",
};

export default function RootNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>404 | MĒTIS</title>
      </head>
      <body className={`${manrope.variable} ${syne.variable} font-sans bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <NotFoundContent dict={enDict} />
        </ThemeProvider>
      </body>
    </html>
  );
}

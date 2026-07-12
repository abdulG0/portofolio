import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LanguageRoot from "@/components/language-root";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elite Portfolio",
  description: "Award-level personal CV and portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageRoot>{children}</LanguageRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}

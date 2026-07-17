import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LanguageRoot from "@/components/language-root";
import { NavigationSync } from "@/components/navigation-sync";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Abdullah Sokhona — Portfolio",
    template: "%s | Abdullah Sokhona",
  },
  description:
    "Abdullah Sokhona — Full-Stack Developer, AI Engineer, and Systems Integrator. Personal CV and portfolio website.",
  authors: [{ name: "Abdullah Sokhona" }],
  creator: "Abdullah Sokhona",
  openGraph: {
    title: "Abdullah Sokhona — Portfolio",
    description:
      "Full-Stack Developer, AI Engineer, and Systems Integrator building end-to-end technology solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <ThemeProvider>
          <NavigationSync />
          <LanguageRoot>{children}</LanguageRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}

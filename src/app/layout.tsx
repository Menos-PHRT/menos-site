import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import React from "react";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "MENOS — Estúdio Criativo de Tecnologia",
    template: "%s | MENOS"
  },
  description: "Desenvolvemos sistemas, automações e experiências digitais simples, elegantes e funcionais para reduzir burocracia, esforço operacional e complexidade.",
  keywords: ["estúdio de tecnologia", "automação", "sistemas internos", "desenvolvimento de software", "simplificação de processos", "design minimalista", "next.js", "terceiro setor", "credenciamento"],
  authors: [{ name: "MENOS Studio" }],
  creator: "MENOS",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://menos.studio",
    title: "MENOS — Estúdio Criativo de Tecnologia",
    description: "Desenvolvemos sistemas, automações e experiências digitais simples e funcionais para reduzir burocracia e complexidade.",
    siteName: "MENOS"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-blue-100 selection:text-blue-900">
        <Header />
        {/* Espaçamento para o Header flutuante */}
        <main className="flex-grow pt-24 md:pt-28">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

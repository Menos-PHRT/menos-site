import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import React from "react";
import IntroGate from "@/components/brand/IntroGate";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "MENOS | Software e Automação com IA",
    template: "%s | MENOS"
  },
  description: "Desenvolvemos sistemas, automações e experiências digitais unindo IA e curadoria técnica especializada, para reduzir burocracia, retrabalho e complexidade operacional.",
  keywords: ["desenvolvimento com IA", "automação de processos", "sistemas internos", "desenvolvimento de software", "plataformas digitais", "next.js", "credenciamento", "certificação digital"],
  authors: [{ name: "MENOS" }],
  creator: "MENOS",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://menos.studio",
    title: "MENOS | Software e Automação com IA",
    description: "Desenvolvemos sistemas, automações e experiências digitais unindo IA e curadoria técnica especializada, para reduzir burocracia e complexidade operacional.",
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
      suppressHydrationWarning
    >
      <head>
        {/* Se a intro já rodou há pouco, esconde o overlay antes da primeira pintura. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{var k=\"menos-intro-seen\",u=new URL(location.href);if(u.searchParams.get(\"intro\")===\"1\")localStorage.removeItem(k);var t=Number(localStorage.getItem(k));if(t>0&&Date.now()-t<1800000)document.documentElement.setAttribute(\"data-intro-seen\",\"\")}catch(e){}"
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground antialiased selection:bg-brand-100 selection:text-brand-900">
        <IntroGate />
        <Header />
        {/* Espaçamento para o Header flutuante */}
        <main className="flex-grow pt-24 md:pt-28">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}

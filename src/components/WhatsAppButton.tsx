"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const WHATSAPP_URL = "https://wa.me/5511952917968";

// Botão flutuante de contato direto. Entrada única ao carregar a página
// (spring sem bounce, Jakub Krehel) — sem pulso ou brilho em loop, que
// envelhece mal e prejudica acessibilidade (ver skill design-motion-principles).
export const WhatsAppButton: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  // Sobe temporariamente enquanto o CookieBanner (mesmo canto) ainda não foi respondido.
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    setCookieBannerVisible(!localStorage.getItem("menos-cookie-consent"));
  }, []);

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a MENOS pelo WhatsApp"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", duration: 0.5, bounce: 0, delay: 0.6 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.06 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      className={`fixed right-5 md:right-8 z-40 h-14 w-14 rounded-full bg-brand-950 text-white flex items-center justify-center shadow-lg shadow-brand-950/20 hover:bg-brand-600 transition-[background-color,bottom] duration-300 ${
        cookieBannerVisible ? "bottom-[15.5rem] md:bottom-44" : "bottom-5 md:bottom-8"
      }`}
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
    </motion.a>
  );
};

export default WhatsAppButton;

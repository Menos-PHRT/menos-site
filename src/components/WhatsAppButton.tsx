"use client";
// Botão flutuante de contato direto (handoff v8): 56px, #0C2424, a 24px do
// canto. Só aparece depois de rolar 0,6 da altura da tela. Mostra a bolha
// "WhatsApp" do cursor personalizado.
import { MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const WHATSAPP_URL = "https://wa.me/5511952917968";

export const WhatsAppButton: React.FC = () => {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  // Sobe enquanto o CookieBanner (mesmo canto) ainda não foi respondido.
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    const checkCookie = () => setCookieBannerVisible(!localStorage.getItem("menos-cookie-consent"));
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    // depois do clique no banner (aceitar/recusar) o botão volta para o canto
    const onClick = () => setTimeout(checkCookie, 60);
    const t = setTimeout(() => { checkCookie(); onScroll(); }, 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("click", onClick);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a MENOS pelo WhatsApp"
      data-cursor="WhatsApp"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "fixed", right: 24, bottom: cookieBannerVisible ? 176 : 24, zIndex: 90, width: 56, height: 56, borderRadius: "50%",
        background: hover ? "#287777" : "#0C2424", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 10px 24px rgba(12,36,36,.25)",
        opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
        transition: "opacity .5s cubic-bezier(.16,1,.3,1), background .3s, bottom .3s"
      }}
    >
      <MessageCircle size={24} strokeWidth={2} />
    </a>
  );
};

export default WhatsAppButton;

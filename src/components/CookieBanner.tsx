"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("menos-cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("menos-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("menos-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 animate-fade-in-up">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xl shadow-slate-200/50 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-semibold text-brand-950">Uso de Cookies & LGPD</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Usamos cookies para melhorar sua experiência em nosso site. Ao navegar, você concorda com nossos{" "}
            <a href="/termos" className="text-brand-600 underline">Termos de Uso</a> e nossa{" "}
            <a href="/privacidade" className="text-brand-600 underline">Política de Privacidade</a>.
          </p>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <button 
            onClick={handleDecline} 
            className="text-xs text-slate-500 hover:text-slate-700 px-3 py-2 rounded-lg font-medium transition"
          >
            Recusar
          </button>
          <Button size="sm" onClick={handleAccept}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CookieBanner;

"use client";
// Mostra a intro só na primeira entrada de uma visita: depois que ela roda, fica 30 min
// sem repetir (vale para trocar de página, recarregar e abrir outra aba). O valor é lido
// uma vez por carregamento de página. ?intro=1 na URL força rodar de novo.
import React, { useEffect, useSyncExternalStore } from "react";
import BrandIntro from "./BrandIntro";

const KEY = "menos-intro-seen";
const TTL_MS = 30 * 60 * 1000;
let seenAtLoad: boolean | null = null;

function alreadySeen(): boolean {
  if (seenAtLoad === null) {
    try {
      if (new URL(location.href).searchParams.get("intro") === "1") localStorage.removeItem(KEY);
      const at = Number(localStorage.getItem(KEY));
      seenAtLoad = at > 0 && Date.now() - at < TTL_MS;
    } catch {
      seenAtLoad = false;
    }
  }
  return seenAtLoad;
}
const noopSubscribe = () => () => {};

export default function IntroGate() {
  // false no servidor/hidratação (a intro já vem no HTML); true no cliente se já foi vista.
  const seen = useSyncExternalStore(noopSubscribe, alreadySeen, () => false);

  useEffect(() => {
    if (!alreadySeen()) {
      try { localStorage.setItem(KEY, String(Date.now())); } catch { /* sem storage: roda a cada carregamento */ }
    }
  }, []);

  if (seen) return null;
  return (
    <div data-intro-overlay="">
      <BrandIntro />
    </div>
  );
}

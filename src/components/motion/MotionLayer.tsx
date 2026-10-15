"use client";
// Camada global de movimento (portada do protótipo v8):
//  - monta a intro de entrada e libera os relógios compartilhados (clock);
//  - cursor personalizado (ponto + anel + bolha com texto), só com mouse;
//  - rolagem suave da roda do mouse (lerp .1) e dos links de âncora;
//  - reveals (data-reveal / data-reveal="mask"), rótulos "scramble" e as
//    "folhas" que escalam ao entrar (data-sheet).
// Tudo escreve direto no DOM dentro do loop único de requestAnimationFrame.
import { usePathname } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import BrandIntro from "../brand/BrandIntro";
import { clock, HERO_DELAY_MS } from "./clock";
import { subscribe } from "./frame";
import { clamp, ease, lerp } from "./math";

// A intro roda só na primeira entrada de uma visita: depois que roda, fica 30 min
// sem repetir (vale para trocar de página, recarregar e abrir outra aba).
// O valor é lido uma vez por carregamento de página.
// ?intro=1 na URL força rodar de novo (útil para demonstrar).
const INTRO_KEY = "menos-intro-seen";
const INTRO_TTL_MS = 30 * 60 * 1000;
let seenAtLoad: boolean | null = null;
function introAlreadySeen(): boolean {
  if (seenAtLoad === null) {
    try {
      if (new URL(location.href).searchParams.get("intro") === "1") localStorage.removeItem(INTRO_KEY);
      const at = Number(localStorage.getItem(INTRO_KEY));
      seenAtLoad = at > 0 && Date.now() - at < INTRO_TTL_MS;
    } catch {
      seenAtLoad = false;
    }
  }
  return seenAtLoad;
}
const noopSubscribe = () => () => {};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Revealable extends HTMLElement {
  _obs?: boolean;
  _tr?: string;
}

export default function MotionLayer() {
  const pathname = usePathname();
  // false no servidor/hidratação (a intro já vem no HTML); true no cliente se já foi vista.
  const introSeen = useSyncExternalStore(noopSubscribe, introAlreadySeen, () => false);
  const [cursorOn, setCursorOn] = useState(false);
  const ring = useRef<HTMLDivElement>(null), vbar = useRef<SVGLineElement>(null),
    dot = useRef<HTMLDivElement>(null), bub = useRef<HTMLDivElement>(null), bubText = useRef<HTMLSpanElement>(null);

  // estado mutável do loop (fora do React)
  const s = useRef({
    mx: 0, my: 0, rx: 0, ry: 0, ptrIn: false, cPlus: 0, cLab: 0, lastLabel: "",
    curEl: null as Element | null, curLabel: null as string | null,
    sy: 0, ty: 0, smoothing: false, smoothOn: false, cursorOn: false,
    revealOn: false, io: null as IntersectionObserver | null, ioMap: new Map<Element, Revealable[]>(),
    sheets: [] as HTMLElement[], queue: [] as Revealable[]
  });

  const scrollToY = (y: number) => {
    const st = s.current;
    y = clamp(y, 0, document.documentElement.scrollHeight - innerHeight);
    if (st.smoothOn) {
      if (!st.smoothing) st.sy = window.scrollY;
      st.ty = y;
      st.smoothing = true;
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // ── reveals ───────────────────────────────────────────────────────────────
  const revealEl = (el: Revealable) => {
    if (el.hasAttribute("data-reveal")) {
      const dl = +(el.getAttribute("data-delay") || 0), mask = el.getAttribute("data-reveal") === "mask";
      el.style.transition = [
        el._tr,
        `opacity 1s cubic-bezier(.16,1,.3,1) ${dl}ms`,
        `transform 1.2s cubic-bezier(.16,1,.3,1) ${dl}ms`,
        mask ? `clip-path 1.2s cubic-bezier(.16,1,.3,1) ${dl}ms` : ""
      ].filter(Boolean).join(", ");
      requestAnimationFrame(() => {
        el.style.opacity = "1"; el.style.transform = "none";
        if (mask) el.style.clipPath = "inset(-20% -5% -25% -5%)";
      });
      setTimeout(() => { el.style.transition = el._tr || ""; if (mask) el.style.clipPath = ""; }, 1450 + dl);
    }
    if (el.hasAttribute("data-scramble")) scramble(el);
  };

  const scramble = (el: HTMLElement) => {
    const node = el.firstChild;
    if (!node || node.nodeType !== 3) return;
    const fin = node.nodeValue || "", chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/", st = performance.now();
    const tick = () => {
      const p = (performance.now() - st) / 900;
      if (p >= 1) { node.nodeValue = fin; return; }
      let o = "";
      for (let i = 0; i < fin.length; i++) { const c = fin[i]; o += c === " " || i < p * fin.length ? c : chars[(Math.random() * chars.length) | 0]; }
      node.nodeValue = o;
      requestAnimationFrame(tick);
    };
    tick();
  };

  // Esconde os elementos [data-reveal] assim que aparecem na página e os coloca
  // numa fila; a observação (IntersectionObserver) só começa quando o hero
  // começa (5,1s da intro), para o conteúdo entrar junto com o fim da intro.
  const flush = () => {
    const st = s.current;
    if (!st.io) {
      st.io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        st.io!.unobserve(e.target);
        const list = st.ioMap.get(e.target);
        if (list) { st.ioMap.delete(e.target); list.forEach(revealEl); } else revealEl(e.target as Revealable);
      }), { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    }
    st.queue.forEach((el) => {
      if (el.getAttribute("data-reveal") === "mask") {
        const host = el.parentElement || el, list = st.ioMap.get(host);
        if (list) list.push(el); else { st.ioMap.set(host, [el]); st.io!.observe(host); }
      } else st.io!.observe(el);
    });
    st.queue = [];
  };

  const prepare = () => {
    const st = s.current, d = 32;
    document.querySelectorAll<Revealable>("[data-reveal],[data-scramble]").forEach((el) => {
      if (el._obs) return;
      el._obs = true;
      if (el.hasAttribute("data-reveal")) {
        el._tr = el.style.transition;
        el.style.opacity = "0"; el.style.transform = `translateY(${d}px)`;
        if (el.getAttribute("data-reveal") === "mask") el.style.clipPath = "inset(0 0 100% 0)";
      }
      st.queue.push(el);
    });
    if (st.revealOn || clock.introDone) flush();
  };

  // ── montagem: intro, cursor, rolagem ──────────────────────────────────────
  useEffect(() => {
    const st = s.current;
    const mm = (q: string) => typeof matchMedia !== "undefined" && matchMedia(q).matches;
    const reduced = mm("(prefers-reduced-motion: reduce)"), fine = mm("(pointer: fine)");
    // Cursor e rolagem suave "sequestram" a entrada do usuário, então respeitam
    // "reduzir movimento". As animações de conteúdo (intro, hero etc.) rodam
    // sempre, por decisão do cliente.
    st.cursorOn = fine && !reduced;
    st.smoothOn = fine && !reduced;
    setCursorOn(st.cursorOn);

    if (introAlreadySeen()) {
      // Já viu a intro nesta sessão: o hero entra agora, sem overlay nem trava de rolagem.
      clock.introDone = true;
      clock.heroT0 = performance.now();
    } else if (!clock.introDone) {
      try { localStorage.setItem(INTRO_KEY, String(Date.now())); } catch { /* sem storage: roda a cada carregamento */ }
      clock.heroT0 = performance.now() + HERO_DELAY_MS;
      window.scrollTo(0, 0);
    }
    st.mx = st.rx = innerWidth / 2; st.my = st.ry = innerHeight / 2;
    st.sy = st.ty = window.scrollY;

    const onMove = (e: PointerEvent) => { st.mx = e.clientX; st.my = e.clientY; st.ptrIn = e.pointerType !== "touch"; };
    const onOut = (e: MouseEvent) => { if (!e.relatedTarget) st.ptrIn = false; };
    const onOver = (e: Event) => {
      const t = (e.target as Element | null)?.closest?.("a,button,[data-cursor]") ?? null;
      st.curEl = t; st.curLabel = t ? t.getAttribute("data-cursor") : null;
    };
    const onWheel = (e: WheelEvent) => {
      if (!clock.introDone) { e.preventDefault(); return; }
      if (!st.smoothOn || e.ctrlKey || document.documentElement.dataset.menu === "open") return;
      // áreas roláveis internas (ex.: o menu lateral) mantêm a rolagem nativa
      if ((e.target as Element | null)?.closest?.("[data-native-scroll]")) return;
      e.preventDefault();
      const dY = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
      if (!st.smoothing) st.sy = st.ty = window.scrollY;
      st.ty = clamp(st.ty + dY, 0, document.documentElement.scrollHeight - innerHeight);
      st.smoothing = true;
    };
    // Âncoras da própria página (#cases, /#cases, /) usam a mesma rolagem suave.
    // Em fase de captura e só com preventDefault: o Link do Next respeita
    // defaultPrevented e não navega, mas os onClick do React (fechar menu) rodam.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self")) return;
      let url: URL;
      try { url = new URL(a.href, location.href); } catch { return; }
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      if (url.search !== location.search) return;
      const id = url.hash.slice(1);
      const tgt = id && id !== "top" ? document.getElementById(id) : null;
      if (id && id !== "top" && !tgt) return;
      e.preventDefault();
      scrollToY(tgt ? tgt.getBoundingClientRect().top + window.scrollY : 0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    document.addEventListener("pointerover", onOver);
    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("click", onClick, true);

    const unsub = subscribe((now) => {
      // rolagem suave
      if (st.smoothing) {
        st.sy = lerp(st.sy, st.ty, 0.1);
        if (Math.abs(st.ty - st.sy) < 0.5) { st.sy = st.ty; st.smoothing = false; }
        window.scrollTo(0, st.sy);
      }
      // começa os reveals junto com o hero
      if (!st.revealOn && now >= clock.heroT0) { st.revealOn = true; flush(); }
      // cursor
      const r = ring.current, d = dot.current, b = bub.current;
      if (r && d && b) {
        st.rx = lerp(st.rx, st.mx, 0.2); st.ry = lerp(st.ry, st.my, 0.2);
        const lab = st.curLabel, on = st.ptrIn && clock.introDone ? 1 : 0;
        st.cPlus = lerp(st.cPlus, st.curEl && !lab ? 1 : 0, 0.18);
        st.cLab = lerp(st.cLab, lab ? 1 : 0, 0.16);
        if (lab && lab !== st.lastLabel) { if (bubText.current) bubText.current.textContent = lab; st.lastLabel = lab; }
        d.style.opacity = String(on * (1 - st.cLab));
        d.style.transform = `translate3d(${st.mx}px,${st.my}px,0)`;
        r.style.opacity = String(on);
        r.style.transform = `translate3d(${st.rx}px,${st.ry}px,0) rotate(${st.cPlus * 90}deg) scale(${(1 + st.cPlus * 0.55) * (1 - st.cLab)})`;
        if (vbar.current) vbar.current.style.transform = `scaleY(${st.cPlus})`;
        b.style.opacity = String(on);
        b.style.transform = `translate3d(${st.rx}px,${st.ry}px,0) scale(${st.cLab})`;
      }
      // folhas (seções que escalam ao entrar)
      const vh = innerHeight;
      for (const sh of st.sheets) {
        const rc = sh.getBoundingClientRect();
        if (rc.top > vh + 10 || rc.bottom < -10) continue;
        const k = ease(clamp((vh - rc.top) / (vh * 0.8)));
        sh.style.transform = k >= 0.999 ? "none" : `scale(${(1 - (1 - k) * 0.06).toFixed(4)})`;
      }
    });

    return () => {
      unsub();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("click", onClick, true);
      st.io?.disconnect(); st.io = null;
      document.documentElement.classList.remove("mn-nocursor");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cada troca de página: reconhece os elementos novos.
  useIsoLayoutEffect(() => {
    const st = s.current;
    st.sheets = Array.from(document.querySelectorAll<HTMLElement>("[data-sheet]"));
    prepare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const finish = () => {
    clock.introDone = true;
    // "Pular intro" antes dos 5,1s: o hero começa agora.
    clock.heroT0 = Math.min(clock.heroT0, performance.now());
    if (s.current.cursorOn) document.documentElement.classList.add("mn-nocursor");
  };

  useEffect(() => {
    if (cursorOn && clock.introDone) document.documentElement.classList.add("mn-nocursor");
  }, [cursorOn]);

  return (
    <>
      {!introSeen && (
        <div data-intro-overlay="">
          <BrandIntro onDone={finish} />
        </div>
      )}
      {cursorOn && (
        <>
          <div ref={ring} aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, zIndex: 400, width: 40, height: 40, margin: "-20px 0 0 -20px", pointerEvents: "none", mixBlendMode: "difference", opacity: 0, willChange: "transform" }}>
            <svg viewBox="-1.5 -1.5 55.74 55.7" style={{ display: "block", width: "100%", height: "100%", overflow: "visible" }}>
              <circle cx="26.43" cy="26.38" r="24.32" fill="none" stroke="#FFFFFF" strokeWidth="2.6" />
              <line x1="11" y1="26.38" x2="41.86" y2="26.38" stroke="#FFFFFF" strokeWidth="2.6" />
              <line ref={vbar} x1="26.43" y1="10.95" x2="26.43" y2="41.81" stroke="#FFFFFF" strokeWidth="2.6" style={{ transformOrigin: "26.43px 26.38px", transform: "scaleY(0)" }} />
            </svg>
          </div>
          <div ref={dot} aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, zIndex: 401, width: 6, height: 6, margin: "-3px 0 0 -3px", borderRadius: "50%", background: "#FFFFFF", mixBlendMode: "difference", pointerEvents: "none", opacity: 0 }} />
          <div ref={bub} aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, zIndex: 402, width: 92, height: 92, margin: "-46px 0 0 -46px", borderRadius: "50%", background: "#143C3C", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "500 13px var(--font-outfit), sans-serif", letterSpacing: ".02em", pointerEvents: "none", transform: "scale(0)" }}>
            <span ref={bubText}>Ver</span>
          </div>
        </>
      )}
    </>
  );
}

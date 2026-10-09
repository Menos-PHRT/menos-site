"use client";
// Cabeçalho do handoff v8: fixo (z 80), aparece depois da intro, muda de tema
// conforme a seção que passa embaixo dele (data-theme, lido a y = 36px) e
// troca de cor com lerp .14 por frame. No desktop o nome de cada item "rola"
// letra a letra no hover; no mobile abre um painel lateral.
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import HeaderLogo from "./brand/HeaderLogo";
import { clock } from "./motion/clock";
import { subscribe } from "./motion/frame";
import { ease, lerp, seg } from "./motion/math";

// Âncoras da home (rolam suavemente quando já se está nela; de outra página,
// levam para a home e rolam até a seção).
const NAV: [string, string][] = [
  ["Serviços", "/#servicos"],
  ["Cases", "/#cases"],
  ["Parceiros", "/#parceiros"],
  ["Como trabalhamos", "/#como-trabalhamos"],
  ["Contato", "/contato"],
  ["A MENOS", "/a-menos"]
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [light, setLight] = useState(true);
  // O menu mobile fecha sozinho ao trocar de página (guarda a rota em que abriu).
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const menu = menuAt === pathname;
  const setMenu = (v: boolean | ((m: boolean) => boolean)) => setMenuAt((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const [navHover, setNavHover] = useState(-1);
  const lightRef = useRef(true);
  const menuRef = useRef(false);
  const flags = useRef<{ sc: boolean | null; l: boolean | null }>({ sc: null, l: null });

  useEffect(() => { menuRef.current = menu; document.documentElement.dataset.menu = menu ? "open" : "closed"; }, [menu]);

  useEffect(() => {
    const unsub = subscribe((now) => {
      const h = headerRef.current;
      if (!h) return;
      const y = window.scrollY, tH = (now - clock.heroT0) / 1000;
      h.style.opacity = String(clock.introDone ? ease(seg(tH, -0.3, 0.6)) : 0);
      let isLight = true;
      document.querySelectorAll<HTMLElement>("[data-theme]").forEach((sec) => {
        const r = sec.getBoundingClientRect();
        if (r.top <= 36 && r.bottom > 36) isLight = sec.getAttribute("data-theme") !== "dark";
      });
      if (menuRef.current) isLight = true;
      if (isLight !== lightRef.current) { lightRef.current = isLight; setLight(isLight); }
      const sc = y > 20, f = flags.current;
      if (f.sc !== sc || f.l !== isLight) {
        f.sc = sc; f.l = isLight;
        h.style.padding = sc ? "12px 0" : "20px 0";
        h.style.boxShadow = sc && isLight ? "0 1px 2px rgba(12,36,36,.06)" : "none";
      }
      clock.themeK = lerp(clock.themeK, isLight ? 1 : 0, 0.14);
    });
    return unsub;
  }, []);

  const hdrBg = light ? "rgba(255,255,255,.9)" : "rgba(12,36,36,.82)";
  const hdrBorder = light ? "rgba(20,60,60,.07)" : "rgba(234,242,238,.08)";
  const hdrNav = light ? "#4E5F5D" : "#B8CCC6";
  const hdrInk = light ? "#0C2424" : "#EAF2EE";
  const alt = light ? "#287777" : "#8CD9D9";

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 80, padding: "20px 0",
          background: hdrBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${hdrBorder}`,
          transition: "padding .3s, box-shadow .3s, background .5s, border-color .5s", opacity: 0
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          {/* Logo: só o ⊖ em repouso; expande para "MENOS" no hover/foco */}
          <HeaderLogo />

          {/* Menu desktop (≥1024px) */}
          <nav className="hidden lg:flex items-center" style={{ gap: 30 }} onMouseLeave={() => setNavHover(-1)}>
            {NAV.map(([name, href], i) => (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => setNavHover(i)}
                style={{ display: "flex", fontSize: 14, fontWeight: 500, color: hdrNav, transition: "color .4s" }}
              >
                <span style={{ display: "flex", height: 18, lineHeight: "18px", overflow: "hidden" }}>
                  {[...name].map((ch, j) => (
                    <span
                      key={j}
                      style={{
                        display: "flex", flexDirection: "column", whiteSpace: "pre",
                        transition: `transform .55s cubic-bezier(.7,0,.2,1) ${j * 16}ms`,
                        transform: navHover === i ? "translateY(-18px)" : "none"
                      }}
                    >
                      <span>{ch}</span>
                      <span style={{ color: alt }}>{ch}</span>
                    </span>
                  ))}
                </span>
              </Link>
            ))}
          </nav>

          {/* Botão do menu mobile */}
          <button
            onClick={() => setMenu((m) => !m)}
            className="lg:hidden"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            style={{ position: "relative", zIndex: 2, padding: 8, background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{ width: 24, height: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span style={{ width: 24, height: 2, background: hdrInk, borderRadius: 2, transition: "all .3s", transformOrigin: "left", transform: menu ? "rotate(45deg) translateX(4px)" : "none" }} />
              <span style={{ width: 24, height: 2, background: hdrInk, borderRadius: 2, transition: "all .3s", opacity: menu ? 0 : 1 }} />
              <span style={{ width: 24, height: 2, background: hdrInk, borderRadius: 2, transition: "all .3s", transformOrigin: "left", transform: menu ? "rotate(-45deg) translateX(4px)" : "none" }} />
            </span>
          </button>
        </div>
      </header>

      {/* Painel lateral (mobile) */}
      <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 70, pointerEvents: menu ? "auto" : "none" }}>
        <div
          onClick={() => setMenu(false)}
          style={{ position: "absolute", inset: 0, background: "rgba(12,36,36,.1)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", transition: "opacity .5s", opacity: menu ? 1 : 0 }}
        />
        <div
          data-native-scroll=""
          style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: 384, boxSizing: "border-box",
            background: "#FFFFFF", borderLeft: "1px solid #EEF2F1", padding: "96px 32px 32px",
            display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32, overflowY: "auto",
            boxShadow: "0 20px 40px rgba(12,36,36,.12)", transition: "transform .6s cubic-bezier(.16,1,.3,1)",
            transform: menu ? "translateX(0)" : "translateX(100%)"
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {NAV.map(([name, href], i) => (
              <Link key={href} href={href} onClick={() => setMenu(false)} className="block overflow-hidden text-[#1F2E2E] hover:text-[#287777]">
                <span
                  style={{
                    display: "block", fontSize: "clamp(20px,4.4vh,26px)", fontWeight: 500, lineHeight: 1.3,
                    transform: menu ? "none" : "translateY(110%)",
                    transition: `transform .8s cubic-bezier(.16,1,.3,1) ${menu ? 200 + i * 55 : 0}ms`
                  }}
                >
                  {name}
                </span>
              </Link>
            ))}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ height: 1, background: "#EEF2F1" }} />
            <Link
              href="/contato"
              onClick={() => setMenu(false)}
              className="flex justify-center text-[14px] font-medium rounded-full bg-[#0C2424] text-white hover:bg-[#287777] transition-colors"
              style={{ padding: "12px 24px" }}
            >
              Vamos simplificar
            </Link>
            <p style={{ margin: 0, textAlign: "center", fontSize: 12, color: "#8A9A97" }}>
              Menos complexidade. Mais espaço e tempo para o que realmente importa.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;

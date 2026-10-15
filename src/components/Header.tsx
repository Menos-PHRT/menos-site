"use client";
// Cabeçalho: fixo (z 80), padding menor depois de 20px de rolagem. No desktop o nome de cada item "rola"
// letra a letra no hover e "Serviços" / "A MENOS" abrem um submenu; no mobile
// abre um painel lateral com os mesmos itens.
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { services } from "@/data/services";
import HeaderLogo from "./brand/HeaderLogo";

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

// Cada item do menu é uma página de verdade. Os filhos levam a outras páginas
// ou a seções dentro da página do item.
const NAV: NavItem[] = [
  {
    name: "Serviços",
    href: "/servicos",
    children: services.slice(0, 5).map((s) => ({ name: s.name, href: `/servicos/${s.slug}` }))
  },
  { name: "Cases", href: "/projetos" },
  { name: "Contato", href: "/contato" },
  {
    name: "A MENOS",
    href: "/a-menos",
    children: [
      { name: "Quem somos", href: "/a-menos#origem" },
      { name: "Equipe", href: "/a-menos#equipe" },
      { name: "Como trabalhamos", href: "/a-menos#como-trabalhamos" },
      { name: "Parceiros", href: "/a-menos#parceiros" }
    ]
  }
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const light = true;
  // O menu mobile fecha sozinho ao trocar de página (guarda a rota em que abriu).
  const [menuAt, setMenuAt] = useState<string | null>(null);
  const menu = menuAt === pathname;
  const setMenu = (v: boolean | ((m: boolean) => boolean)) =>
    setMenuAt((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const [navHover, setNavHover] = useState(-1);
  const [open, setOpen] = useState(-1);

  useEffect(() => { document.documentElement.dataset.menu = menu ? "open" : "closed"; }, [menu]);
  // Fecha o submenu ao trocar de página
  useEffect(() => {
    const t = setTimeout(() => setOpen(-1), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  // Padding e sombra mudam depois de 20px de rolagem.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hdrBg = light ? "rgba(255,255,255,.9)" : "rgba(12,36,36,.82)";
  const hdrBorder = light ? "rgba(20,60,60,.07)" : "rgba(234,242,238,.08)";
  const hdrNav = light ? "#4E5F5D" : "#B8CCC6";
  const hdrInk = light ? "#0C2424" : "#EAF2EE";
  const alt = light ? "#287777" : "#8CD9D9";
  const panelBg = light ? "#FFFFFF" : "#0C2424";
  const panelBorder = light ? "#EEF2F1" : "rgba(234,242,238,.12)";
  const panelItem = light ? "#1F2E2E" : "#E4F6F6";

  // índice achatado para atrasar a entrada de cada link do painel mobile
  let flat = 0;

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 80, padding: scrolled ? "12px 0" : "20px 0",
          boxShadow: scrolled ? "0 1px 2px rgba(12,36,36,.06)" : "none",
          background: hdrBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${hdrBorder}`,
          transition: "padding .3s, box-shadow .3s, background .5s, border-color .5s"
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          {/* Logo: completo em repouso; no hover recolhe para só o símbolo */}
          <HeaderLogo />

          {/* Menu desktop (≥1024px) */}
          <nav aria-label="Principal" className="hidden lg:flex items-center" style={{ gap: 30 }} onMouseLeave={() => setNavHover(-1)}>
            {NAV.map((item, i) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => { setNavHover(i); setOpen(item.children ? i : -1); }}
                onMouseLeave={() => setOpen(-1)}
                onFocus={() => setOpen(item.children ? i : -1)}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(-1); }}
              >
                <Link
                  href={item.href}
                  aria-haspopup={item.children ? "true" : undefined}
                  aria-expanded={item.children ? open === i : undefined}
                  style={{ display: "flex", fontSize: 14, fontWeight: 500, color: hdrNav, transition: "color .4s" }}
                >
                  <span style={{ display: "flex", height: 18, lineHeight: "18px", overflow: "hidden" }}>
                    {[...item.name].map((ch, j) => (
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
                {item.children && (
                  <div
                    style={{
                      position: "absolute", top: "100%", left: -16, paddingTop: 18, minWidth: 230,
                      opacity: open === i ? 1 : 0, transform: open === i ? "none" : "translateY(-6px)",
                      pointerEvents: open === i ? "auto" : "none", visibility: open === i ? "visible" : "hidden",
                      transition: "opacity .25s, transform .35s cubic-bezier(.16,1,.3,1), visibility .25s"
                    }}
                  >
                    <ul
                      style={{
                        listStyle: "none", margin: 0, padding: 8, background: panelBg, border: `1px solid ${panelBorder}`,
                        borderRadius: 16, boxShadow: "0 20px 40px rgba(12,36,36,.12)"
                      }}
                    >
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block rounded-[10px] hover:bg-[#F4FBFB] hover:text-[#287777]"
                            style={{ padding: "10px 12px", fontSize: 14, fontWeight: 500, color: panelItem, transition: "background .2s, color .2s" }}
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Botão do menu mobile */}
          <button
            onClick={() => setMenu((m) => !m)}
            className="lg:hidden"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            style={{ position: "relative", zIndex: 2, padding: 12, margin: -4, background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{ width: 24, height: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span style={{ width: 24, height: 2, background: hdrInk, borderRadius: 2, transition: "all .3s", transformOrigin: "left", transform: menu ? "rotate(45deg) translateX(4px)" : "none" }} />
              <span style={{ width: 24, height: 2, background: hdrInk, borderRadius: 2, transition: "all .3s", opacity: menu ? 0 : 1 }} />
              <span style={{ width: 24, height: 2, background: hdrInk, borderRadius: 2, transition: "all .3s", transformOrigin: "left", transform: menu ? "rotate(-45deg) translateX(4px)" : "none" }} />
            </span>
          </button>
        </div>
      </header>

      {/* Painel lateral (mobile e tablet) */}
      <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 70, pointerEvents: menu ? "auto" : "none" }}>
        <div
          onClick={() => setMenu(false)}
          style={{ position: "absolute", inset: 0, background: "rgba(12,36,36,.1)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", transition: "opacity .5s", opacity: menu ? 1 : 0 }}
        />
        <div
          data-native-scroll=""
          aria-hidden={!menu}
          style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: 384, boxSizing: "border-box",
            background: "#FFFFFF", borderLeft: "1px solid #EEF2F1", padding: "96px 32px 32px",
            display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32, overflowY: "auto", overscrollBehavior: "contain",
            boxShadow: "0 20px 40px rgba(12,36,36,.12)", transition: "transform .6s cubic-bezier(.16,1,.3,1)",
            transform: menu ? "translateX(0)" : "translateX(100%)"
          }}
        >
          <nav aria-label="Principal (mobile)" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {NAV.map((item) => {
              const row = (name: string, href: string, small: boolean) => {
                const i = flat++;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenu(false)}
                    tabIndex={menu ? 0 : -1}
                    className="flex items-center overflow-hidden text-[#1F2E2E] hover:text-[#287777]"
                    style={{ minHeight: 44 }}
                  >
                    <span
                      style={{
                        display: "block", fontSize: small ? 16 : "clamp(20px,4.4vh,26px)", fontWeight: small ? 400 : 500, lineHeight: 1.3,
                        paddingLeft: small ? 16 : 0, color: small ? "#4E5F5D" : undefined,
                        transform: menu ? "none" : "translateY(110%)",
                        transition: `transform .8s cubic-bezier(.16,1,.3,1) ${menu ? 200 + i * 45 : 0}ms`
                      }}
                    >
                      {name}
                    </span>
                  </Link>
                );
              };
              return (
                <div key={item.href} style={{ display: "flex", flexDirection: "column" }}>
                  {row(item.name, item.href, false)}
                  {item.children?.map((c) => row(c.name, c.href, true))}
                </div>
              );
            })}
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ height: 1, background: "#EEF2F1" }} />
            <Link
              href="/contato"
              onClick={() => setMenu(false)}
              tabIndex={menu ? 0 : -1}
              className="flex justify-center items-center text-[14px] font-medium rounded-full bg-[#0C2424] text-white hover:bg-[#287777] transition-colors"
              style={{ padding: "12px 24px", minHeight: 48 }}
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

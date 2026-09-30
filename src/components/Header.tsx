"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeaderLogo from "./brand/HeaderLogo";
import { Button } from "./ui/Button";

// Ativo também nas subpáginas (ex.: /servicos/automacoes acende "Serviços").
function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar menu mobile ao trocar de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Menu igual ao handoff de design: Serviços e Cases separados (a fusão de
  // conteúdo continua existindo — cada página de serviço mostra os cases
  // reais relacionados — só o menu não junta os dois num item só).
  const navLinks = [
    { name: "Serviços", href: "/servicos" },
    { name: "Cases", href: "/projetos" },
    { name: "Parceiros", href: "/parceiros" },
    { name: "Como trabalhamos", href: "/como-trabalhamos" },
    { name: "Contato", href: "/contato" },
    { name: "A MENOS", href: "/a-menos" }
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-[padding,box-shadow] duration-300 bg-white/90 backdrop-blur-md"
        style={{
          borderBottom: "1px solid rgba(20,60,60,.07)",
          padding: isScrolled ? "12px 0" : "20px 0",
          boxShadow: isScrolled ? "0 1px 2px rgba(12,36,36,.06)" : "none"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
          {/* Logo: só o símbolo em repouso, expande para "MENOS" no hover/foco */}
          <HeaderLogo />

          {/* Desktop Nav — sem botão de CTA aqui, por desenho */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: isNavActive(pathname, link.href) ? "#287777" : "#4E5F5D" }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Burger Button (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 focus:outline-none relative z-10"
            aria-label="Abrir menu de navegação"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span
                className="w-6 h-[2px] rounded transition-all duration-300 origin-left"
                style={{ background: "#0C2424", transform: isMenuOpen ? "rotate(45deg) translateX(4px)" : "none" }}
              ></span>
              <span
                className="w-6 h-[2px] rounded transition-all duration-300"
                style={{ background: "#0C2424", opacity: isMenuOpen ? 0 : 1 }}
              ></span>
              <span
                className="w-6 h-[2px] rounded transition-all duration-300 origin-left"
                style={{ background: "#0C2424", transform: isMenuOpen ? "rotate(-45deg) translateX(4px)" : "none" }}
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className="fixed inset-0 z-30 lg:hidden" style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}>
        <div
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: "rgba(12,36,36,.1)", backdropFilter: "blur(4px)", opacity: isMenuOpen ? 1 : 0 }}
        ></div>

        <div
          className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white flex flex-col justify-between transition-transform duration-500 ease-out"
          style={{
            borderLeft: "1px solid #EEF2F1",
            padding: "112px 32px 32px",
            boxShadow: "0 20px 40px rgba(12,36,36,.12)",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)"
          }}
        >
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium transition-colors"
                style={{ color: isNavActive(pathname, link.href) ? "#287777" : "#1F2E2E" }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-6">
            <div className="h-px" style={{ background: "#EEF2F1" }}></div>
            <Button variant="primary" size="md" href="/contato" className="w-full">
              Vamos simplificar
            </Button>
            <p className="text-center text-xs" style={{ color: "#8A9A97" }}>
              Menos complexidade. Mais espaço e tempo para o que realmente importa.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;

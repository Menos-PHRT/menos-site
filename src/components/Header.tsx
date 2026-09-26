"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/Button";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar menu mobile ao trocar de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Início", href: "/" },
    { name: "A MENOS", href: "/a-menos" },
    { name: "Serviços", href: "/servicos" },
    { name: "Projetos", href: "/projetos" },
    { name: "Parceiros", href: "/parceiros" },
    { name: "Como trabalhamos", href: "/como-trabalhamos" },
    { name: "Contato", href: "/contato" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-100/60 ${
          isScrolled ? "py-3 shadow-xs" : "py-4 md:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-semibold text-xl tracking-wider text-slate-900 uppercase focus:outline-none"
            aria-label="Ir para página inicial MENOS"
          >
            <span className="h-[3px] w-5 bg-slate-900 transition-all duration-300 group-hover:w-2.5 group-hover:bg-blue-600"></span>
            menos
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive ? "text-blue-600" : "text-slate-600"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="primary" size="sm" href="/contato">
              Vamos simplificar
            </Button>
          </div>

          {/* Burger Button (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-900 focus:outline-none"
            aria-label="Abrir menu de navegação"
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span
                className={`w-6 h-[2px] bg-slate-900 rounded transition-all duration-300 origin-left ${isMenuOpen ? "rotate-45 translate-x-1" : ""
                  }`}
              ></span>
              <span
                className={`w-6 h-[2px] bg-slate-900 rounded transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                  }`}
              ></span>
              <span
                className={`w-6 h-[2px] bg-slate-900 rounded transition-all duration-300 origin-left ${isMenuOpen ? "-rotate-45 translate-x-1" : ""
                  }`}
              ></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-all duration-500 ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-slate-900/10 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
        ></div>

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white border-l border-slate-100 p-8 pt-28 flex flex-col justify-between shadow-xl transition-transform duration-500 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-medium transition-colors hover:text-blue-600 ${isActive ? "text-blue-600" : "text-slate-800"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-6">
            <div className="h-[1px] bg-slate-100"></div>
            <Button variant="primary" size="md" href="/contato" className="w-full">
              Vamos simplificar
            </Button>
            <p className="text-center text-xs text-slate-400">
              Menos complexidade. Mais espaço e tempo para o que realmente importa.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;

import Link from "next/link";
import React from "react";
import { MenosWordmark } from "./MenosWordmark";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const linkStyle = { color: "#8FA9A3" };

  return (
    <footer style={{ background: "#0C2424", color: "#B8CCC6" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">
            <Link href="/" className="self-start focus:outline-none">
              <MenosWordmark
                progress={1}
                colors={["#8CD9D9", "#8CD9D9"]}
                letterColor="#EAF2EE"
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Criamos sistemas, automações e experiências digitais que organizam processos, reduzem retrabalho e tornam a tecnologia mais simples para pessoas e organizações.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <p className="m-0">
                <strong style={{ color: "#EAF2EE" }}>Contato:</strong>{" "}
                <a href="mailto:menos.lab@gmail.com" style={linkStyle} className="hover:!text-[#8CD9D9] transition">
                  menos.lab@gmail.com
                </a>
              </p>
              <p className="m-0">
                <strong style={{ color: "#EAF2EE" }}>Resposta média:</strong> Em até 15 minutos
              </p>
            </div>
          </div>

          {/* Site Menu */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#EAF2EE" }}>Estúdio</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/como-trabalhamos" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Como trabalhamos</Link>
              <Link href="/parceiros" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Parceiros</Link>
              <Link href="/contato" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Contato</Link>
              <Link href="/a-menos" style={linkStyle} className="hover:!text-[#8CD9D9] transition">A MENOS</Link>
            </nav>
          </div>

          {/* Top Services Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#EAF2EE" }}>Soluções</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/servicos/automacoes" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Automações</Link>
              <Link href="/servicos/sistemas-internos" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Sistemas Internos</Link>
              <Link href="/servicos/plataformas-digitais" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Plataformas Digitais</Link>
              <Link href="/servicos/sites-institucionais" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Sites Institucionais</Link>
              <Link href="/servicos/formularios-inteligentes" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Formulários Inteligentes</Link>
              <Link href="/servicos/dashboards" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Dashboards</Link>
            </nav>
          </div>

          {/* Socials / Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#EAF2EE" }}>Redes</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="https://wa.me/5511952917968" target="_blank" rel="noopener noreferrer" style={linkStyle} className="hover:!text-[#8CD9D9] transition">WhatsApp</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkStyle} className="hover:!text-[#8CD9D9] transition">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={linkStyle} className="hover:!text-[#8CD9D9] transition">Instagram</a>
            </nav>
          </div>
        </div>

        <div className="h-px mb-8" style={{ background: "rgba(234,242,238,.1)" }}></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-xs" style={{ color: "#6F948B" }}>
            <span>© {currentYear} MENOS Estúdio Criativo de Tecnologia.</span>
            <Link href="/privacidade" className="hover:!text-[#B8CCC6] transition">Política de Privacidade</Link>
            <Link href="/termos" className="hover:!text-[#B8CCC6] transition">Termos de Uso</Link>
          </div>
          <div className="text-sm font-light tracking-wider flex items-center gap-2" style={{ color: "#B8CCC6" }}>
            <span>menos vira mais</span>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#8CD9D9" }}></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

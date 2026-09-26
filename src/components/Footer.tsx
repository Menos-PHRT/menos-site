import Link from "next/link";
import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-100/80 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-semibold text-xl tracking-wider text-slate-900 uppercase focus:outline-none"
            >
              <span className="h-[3px] w-5 bg-slate-900 transition-all duration-300 group-hover:w-2.5 group-hover:bg-blue-600"></span>
              menos
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              Criamos sistemas, automações e experiências digitais que organizam processos, reduzem retrabalho e tornam a tecnologia mais simples para pessoas e organizações.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <p>
                <strong>Contato:</strong>{" "}
                <a href="mailto:menos.lab@gmail.com" className="hover:text-blue-600 transition">
                  menos.lab@gmail.com
                </a>
              </p>
              <p>
                <strong>Resposta média:</strong> Em até 1 hora
              </p>
            </div>
          </div>

          {/* Site Menu */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Estúdio</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/a-menos" className="text-slate-500 hover:text-blue-600 transition">A MENOS</Link>
              <Link href="/como-trabalhamos" className="text-slate-500 hover:text-blue-600 transition">Como trabalhamos</Link>
              <Link href="/parceiros" className="text-slate-500 hover:text-blue-600 transition">Parceiros</Link>
              <Link href="/contato" className="text-slate-500 hover:text-blue-600 transition">Contato</Link>
            </nav>
          </div>

          {/* Top Services Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Soluções</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/servicos/automacoes" className="text-slate-500 hover:text-blue-600 transition">Automações</Link>
              <Link href="/servicos/sistemas-internos" className="text-slate-500 hover:text-blue-600 transition">Sistemas Internos</Link>
              <Link href="/servicos/plataformas-digitais" className="text-slate-500 hover:text-blue-600 transition">Plataformas Digitais</Link>
              <Link href="/servicos/sites-institucionais" className="text-slate-500 hover:text-blue-600 transition">Sites Institucionais</Link>
              <Link href="/servicos/formularios-inteligentes" className="text-slate-500 hover:text-blue-600 transition">Formulários Inteligentes</Link>
              <Link href="/servicos/dashboards" className="text-slate-500 hover:text-blue-600 transition">Dashboards</Link>
            </nav>
          </div>

          {/* Socials / Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Redes</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition">WhatsApp</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition">Instagram</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 transition">GitHub</a>
            </nav>
          </div>
        </div>

        <div className="h-[1px] bg-slate-200/60 mb-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span>&copy; {currentYear} MENOS Estúdio Criativo de Tecnologia.</span>
            <Link href="/privacidade" className="hover:text-slate-600 transition">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-slate-600 transition">Termos de Uso</Link>
          </div>
          <div className="text-sm font-light text-slate-500 tracking-wider flex items-center gap-2">
            <span>menos vira mais</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

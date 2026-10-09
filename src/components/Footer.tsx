import Link from "next/link";
import React from "react";
import { M_POLYS, N_POLYS, S_PATH, E, O, STROKE, L_E, AOFF } from "./brand/menosGeometry";
import { services } from "@/data/services";

// Rodapé do handoff v8 (captura 21): id "a-menos", tema escuro (o cabeçalho
// lê data-theme), logo pequeno em #EAF2EE com o "e" em #8CD9D9.
const linkClass = "text-[#8FA9A3] hover:text-[#8CD9D9] transition-colors";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const cols: { title: string; links: { name: string; href: string; external?: boolean }[] }[] = [
    {
      title: "Estúdio",
      links: [
        { name: "Como trabalhamos", href: "/#como-trabalhamos" },
        { name: "Parceiros", href: "/#parceiros" },
        { name: "Contato", href: "/contato" },
        { name: "A MENOS", href: "/a-menos" }
      ]
    },
    {
      title: "Soluções",
      links: services.slice(0, 5).map((s) => ({ name: s.name, href: `/servicos/${s.slug}` }))
    },
    {
      title: "Redes",
      links: [
        { name: "WhatsApp", href: "https://wa.me/5511952917968", external: true },
        { name: "LinkedIn", href: "https://linkedin.com", external: true },
        { name: "Instagram", href: "https://instagram.com", external: true }
      ]
    }
  ];

  return (
    <footer id="a-menos" data-theme="dark" style={{ position: "relative", zIndex: 3, background: "#0C2424", color: "#B8CCC6", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px 28px", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))", gap: 40 }}>
          <div className="lg:col-span-2" style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
            <Link href="/" aria-label="MENOS, página inicial" className="self-start">
              <svg viewBox="-2 0 254 55" aria-hidden="true" style={{ height: 24, width: "auto", display: "block", overflow: "visible" }}>
                <g fill="#EAF2EE">
                  {M_POLYS.map((q) => <polygon key={q} points={q} />)}
                  {N_POLYS.map((q) => <polygon key={q} points={q} />)}
                </g>
                <circle cx={E.cx} cy={E.cy} r={E.r} fill="none" stroke="#8CD9D9" strokeWidth={STROKE} strokeDasharray={`${(L_E - 5.48).toFixed(2)} 5.48`} strokeDashoffset={-AOFF} />
                <line x1={E.x1} y1={E.y1} x2={E.x2} y2={E.y2} stroke="#8CD9D9" strokeWidth={STROKE} />
                <circle cx={O.cx} cy={O.cy} r={O.r} fill="none" stroke="#EAF2EE" strokeWidth={STROKE} />
                <path d={S_PATH} fill="none" stroke="#EAF2EE" strokeWidth={STROKE} />
              </svg>
            </Link>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, maxWidth: 384 }}>
              Criamos sistemas, automações e experiências digitais que organizam processos, reduzem retrabalho e tornam a tecnologia mais simples para pessoas e organizações.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <p style={{ margin: 0 }}>
                <strong style={{ color: "#EAF2EE" }}>Contato:</strong>{" "}
                <a href="mailto:menos.lab@gmail.com" className={linkClass}>menos.lab@gmail.com</a>
                <br />
                <a href="mailto:robert@menosdev.com" className={linkClass}>robert@menosdev.com</a>
              </p>
              <p style={{ margin: 0 }}><strong style={{ color: "#EAF2EE" }}>Resposta média:</strong> Em até 15 minutos</p>
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#EAF2EE", textTransform: "uppercase", letterSpacing: ".06em" }}>{col.title}</h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                {col.links.map((l) =>
                  l.external ? (
                    <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{l.name}</a>
                  ) : (
                    <Link key={l.name} href={l.href} className={linkClass}>{l.name}</Link>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(234,242,238,.1)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 12, color: "#6F948B" }}>
            <span>© {currentYear} MENOS Estúdio Criativo de Tecnologia.</span>
            <Link href="/privacidade" className="hover:text-[#B8CCC6] transition-colors">Política de Privacidade</Link>
            <Link href="/termos" className="hover:text-[#B8CCC6] transition-colors">Termos de Uso</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 300, letterSpacing: ".06em", color: "#B8CCC6" }}>
            <span>menos vira mais</span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8CD9D9" }} />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

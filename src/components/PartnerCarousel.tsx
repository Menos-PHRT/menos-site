import React from "react";
import { partners } from "@/data/partners";

export const PartnerCarousel: React.FC = () => {
  // Duplicar a lista de parceiros para garantir um scroll contínuo e sem emendas
  const carouselItems = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full overflow-hidden py-10 bg-white/40 border-y border-slate-100/60">
      {/* Degradê de desfoque nas bordas laterais para efeito premium */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-full">
        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap">
          {carouselItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center gap-2 group cursor-default"
            >
              {/* Ícone geométrico abstrato sutil antes do nome */}
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-colors group-hover:bg-brand-600"></span>
              <span className="text-sm font-semibold tracking-widest text-slate-400 group-hover:text-slate-800 uppercase transition-colors duration-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PartnerCarousel;

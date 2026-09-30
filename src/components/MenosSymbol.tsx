"use client";

import React, { useEffect, useRef } from "react";

// Símbolo isolado da marca (sem as letras) — geometria própria, diferente do
// "e" embutido no MenosWordmark. Usado na intro de carregamento e na chamada
// final, ligado ao scroll. viewBox e raio exatos do handoff de design.
const R = 24.32;
export const SYMBOL_CIRCUMFERENCE = 2 * Math.PI * R;

interface MenosSymbolProps {
  className?: string;
  size?: number;
  /** 0 = círculo fechado, 1 = totalmente aberto (o "e"). Controlado externamente. */
  gapProgress?: number;
  /** 0 = cor original (#0E1414), 1 = cor da marca (#143C3C). */
  colorProgress?: number;
}

export const MenosSymbol: React.FC<MenosSymbolProps> = ({ className = "", size = 64, gapProgress = 0, colorProgress = 0 }) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const L = SYMBOL_CIRCUMFERENCE;
  const gap = (L * 12.9 / 360) * gapProgress;
  const offset = -(L * 5.4 / 360) * gapProgress;
  const A = [0x0e, 0x14, 0x14], B = [0x14, 0x3c, 0x3c];
  const color = `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * colorProgress)).join(",")})`;

  useEffect(() => {
    circleRef.current?.setAttribute("stroke-dasharray", `${L - gap} ${gap}`);
    circleRef.current?.setAttribute("stroke-dashoffset", String(offset));
  }, [gap, offset, L]);

  return (
    <svg viewBox="0 0 52.74 52.7" width={size} height={size} className={className} style={{ overflow: "visible" }} aria-hidden="true">
      <circle ref={circleRef} cx="26.43" cy="26.38" r={R} fill="none" stroke={color} strokeWidth="4.2" />
      <line ref={lineRef} x1="7.37" y1="26.24" x2="44.91" y2="26.01" stroke={color} strokeWidth="4.2" />
    </svg>
  );
};

export default MenosSymbol;

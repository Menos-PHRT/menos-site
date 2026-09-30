"use client";

import { useReducedMotion, useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";
import { MenosSymbol, SYMBOL_CIRCUMFERENCE } from "./MenosSymbol";

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const easeIO = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = hexToRgb(a), B = hexToRgb(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};

// Símbolo da chamada final: a cor migra do original para a da marca na
// primeira metade do scroll da seção, e a quebra do "e" abre na segunda.
export const ScrollMark: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.4"] });
  const color = useTransform(scrollYProgress, (p) => mix("#0E1414", "#143C3C", clamp(p * 2)));
  const gapProgress = useTransform(scrollYProgress, (p) => easeIO(clamp(p * 2 - 1)));

  if (shouldReduceMotion) {
    return <div ref={ref}><MenosSymbol size={64} gapProgress={1} colorProgress={1} /></div>;
  }

  return (
    <div ref={ref}>
      <ScrollMarkAnimated color={color} gapProgress={gapProgress} />
    </div>
  );
};

// Separado para poder usar os MotionValues diretamente nos atributos SVG.
const ScrollMarkAnimated: React.FC<{ color: ReturnType<typeof useTransform<number, string>>; gapProgress: ReturnType<typeof useTransform<number, number>> }> = ({ color, gapProgress }) => {
  const L = SYMBOL_CIRCUMFERENCE;
  const dashArray = useTransform(gapProgress, (g) => `${L - g * L * 12.9 / 360} ${g * L * 12.9 / 360}`);
  const dashOffset = useTransform(gapProgress, (g) => -(g * L * 5.4 / 360));

  return (
    <svg viewBox="0 0 52.74 52.7" width={64} height={64} style={{ overflow: "visible" }} aria-hidden="true">
      <motion.circle cx="26.43" cy="26.38" r="24.32" fill="none" stroke={color} strokeWidth="4.2" style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }} />
      <motion.line x1="7.37" y1="26.24" x2="44.91" y2="26.01" stroke={color} strokeWidth="4.2" />
    </svg>
  );
};

export default ScrollMark;

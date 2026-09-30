"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

interface MenosMarkProps {
  size?: number;
  className?: string;
  /** Toca a animação de formação (traço -> círculo) uma vez ao montar. Só se aplica à variante "minus". */
  animate?: boolean;
  /**
   * "minus": círculo fechado — o símbolo de "menos" isolado.
   * "e": círculo com uma quebra do lado direito — o mesmo símbolo funcionando
   * como a letra "E" no lockup "MENOS" (M-[e]-NOS).
   */
  variant?: "minus" | "e";
}

// Símbolo da MENOS: um traço (o "menos" original) fechado por um círculo —
// a variante "e" abre uma quebra no lado direito do círculo, para funcionar
// como a letra "E" no lockup "MENOS". Com animate=true (só variante "minus"),
// ele se FORMA: o traço aparece primeiro, depois o círculo se desenha ao redor
// — o processo que organiza e fecha a forma, a origem do processo de simplificar.
// Usa currentColor: a cor é controlada via className de texto (text-*).
export const MenosMark: React.FC<MenosMarkProps> = ({ size = 32, className = "", animate = false, variant = "minus" }) => {
  const shouldReduceMotion = useReducedMotion();
  const playAnimation = variant === "minus" && animate && !shouldReduceMotion;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.rect
        x="26"
        y="43"
        width="48"
        height="14"
        rx="3"
        fill="currentColor"
        style={{ transformOrigin: "50% 50%" }}
        initial={playAnimation ? { scaleX: 0 } : false}
        animate={{ scaleX: 1 }}
        transition={playAnimation ? { duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.1 } : { duration: 0 }}
      />
      {variant === "e" ? (
        // Círculo com quebra à direita (50° de arco, centrados no eixo
        // horizontal direito) — arco calculado por ângulo, não por
        // stroke-dasharray (o ponto de início do path de um <circle> não é
        // o lado direito em todos os navegadores testados).
        <path
          d="M 87.16 67.33 A 41 41 0 1 1 87.16 32.67"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
        />
      ) : (
        <motion.circle
          cx="50"
          cy="50"
          r="41"
          stroke="currentColor"
          strokeWidth="10"
          style={{ transformOrigin: "50% 50%", rotate: -90 }}
          initial={playAnimation ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={playAnimation ? { duration: 0.65, ease: [0.65, 0, 0.35, 1], delay: 0.4 } : { duration: 0 }}
        />
      )}
    </svg>
  );
};

export default MenosMark;

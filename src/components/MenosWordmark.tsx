"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MenosMark } from "./MenosMark";

interface MenosWordmarkProps {
  className?: string;
  /**
   * Anima a formação da marca ao montar: o símbolo "menos" original (círculo
   * fechado, preto) se transforma no símbolo "E" (círculo com a quebra, cor
   * herdada do texto), enquanto "M" e "NOS" aparecem ao lado. Toca uma vez.
   * Reservado para o momento de marca principal (o cabeçalho) — não repetir
   * em todo lugar que o wordmark aparece.
   */
  animateIntro?: boolean;
}

// Lockup "MENOS" com o símbolo da marca no lugar do "E". Escala junto com o
// texto ao redor (tamanho em em, não em px fixo) — usar dentro de um elemento
// com font-size definido.
export const MenosWordmark: React.FC<MenosWordmarkProps> = ({ className = "", animateIntro = false }) => {
  const shouldReduceMotion = useReducedMotion();
  // `useReducedMotion()` pode já vir com o valor real (true/false) no primeiro
  // render do cliente, diferente do que o servidor renderizou (que nunca sabe
  // a preferência do SO). Como a versão animada troca a ESTRUTURA do HTML
  // (não só valores de estilo), isso quebraria a hidratação para quem tem
  // "reduzir movimento" ligado no sistema. Por isso, sempre renderizamos a
  // versão estática no servidor e no primeiro paint do cliente (idênticos, sem
  // risco de mismatch) e só "religamos" a animação depois de montado.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const playIntro = mounted && animateIntro && !shouldReduceMotion;

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <motion.span
        initial={playIntro ? { opacity: 0, x: -8 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={playIntro ? { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.75 } : { duration: 0 }}
      >
        M
      </motion.span>

      <span
        className="inline-block relative shrink-0"
        style={{ width: "0.85em", height: "0.85em", margin: "0 0.01em", top: "0.02em" }}
      >
        {playIntro ? (
          <>
            {/* Símbolo original (o "menos" fechado, preto) — presente desde o
                início, depois se dissolve dando lugar ao símbolo "E". */}
            <motion.div
              className="absolute inset-0 text-slate-900"
              initial={{ opacity: 1, rotate: 0, scale: 1 }}
              animate={{ opacity: 0, rotate: 18, scale: 0.85 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.35 }}
            >
              <MenosMark variant="minus" size={100} className="w-full h-full" />
            </motion.div>
            {/* Símbolo "E" (a quebra à direita) — nasce da transformação. */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, rotate: -18, scale: 1.15 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: 0.45 }}
            >
              <MenosMark variant="e" size={100} className="w-full h-full" />
            </motion.div>
          </>
        ) : (
          <MenosMark variant="e" size={100} className="w-full h-full absolute inset-0" />
        )}
      </span>

      <motion.span
        initial={playIntro ? { opacity: 0, x: 8 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={playIntro ? { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.85 } : { duration: 0 }}
      >
        NOS
      </motion.span>
    </span>
  );
};

export default MenosWordmark;

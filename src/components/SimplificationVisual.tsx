"use client";

import { motion } from "framer-motion";
import React from "react";

export const SimplificationVisual: React.FC = () => {

  // Definição dos nós embaralhados (estado inicial) e ordenados (estado final)
  const nodes = [
    { id: 1, initialX: 50, initialY: 80, finalX: 100, finalY: 175 },
    { id: 2, initialX: 320, initialY: 60, finalX: 200, finalY: 175 },
    { id: 3, initialX: 120, initialY: 300, finalX: 300, finalY: 175 },
    { id: 4, initialX: 380, initialY: 280, finalX: 400, finalY: 175 },
    { id: 5, initialX: 240, initialY: 180, finalX: 500, finalY: 175 }
  ];

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-100/50 overflow-hidden bg-dot-grid">
      {/* Grade decorativa */}
      <div className="absolute top-4 left-4 text-xs font-mono text-slate-400/60 uppercase select-none tracking-widest">
        menos.flow_optimizer
      </div>

      <svg className="w-full h-full max-w-[500px] max-h-[350px]" viewBox="0 0 600 350">
        {/* Linhas Conectoras Bagunçadas */}
        <motion.path
          d="M 50 80 Q 240 180 320 60 T 120 300 T 380 280 T 240 180"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          animate={{
            strokeDashoffset: [0, -20]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear"
          }}
        />

        {/* Linha Simplificada Principal */}
        <motion.line
          x1="100"
          y1="175"
          x2="500"
          y2="175"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
        />

        {/* Linha Fina Organizadora */}
        <motion.line
          x1="100"
          y1="175"
          x2="500"
          y2="175"
          stroke="#93C5FD"
          strokeWidth="8"
          strokeLinecap="round"
          className="opacity-20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 1.8, ease: "easeInOut" }}
        />

        {/* Linhas de Fluxo Secundárias */}
        {[100, 200, 300, 400].map((x, i) => (
          <motion.path
            key={`flow-${i}`}
            d={`M ${x} 175 C ${x + 50} ${175 + (i % 2 === 0 ? 30 : -30)}, ${x + 50} 175, ${x + 100} 175`}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1"
            className="opacity-40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5 + i * 0.2, duration: 1 }}
          />
        ))}

        {/* Nós Animados */}
        {nodes.map((node) => (
          <g key={node.id}>
            {/* Nó Bagunçado Inicial */}
            <motion.circle
              cx={node.initialX}
              cy={node.initialY}
              r="6"
              fill="#94A3B8"
              className="opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: node.id * 0.4
              }}
            />

            {/* Nó do Caminho Simplificado (Transição do Caos para a Ordem) */}
            <motion.circle
              cx={node.initialX}
              cy={node.initialY}
              r="8"
              fill="#1E293B"
              animate={{
                cx: [node.initialX, node.initialX, node.finalX],
                cy: [node.initialY, node.initialY, node.finalY],
                fill: ["#64748B", "#475569", "#2563EB"]
              }}
              transition={{
                duration: 2.2,
                ease: [0.76, 0, 0.24, 1],
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2
              }}
            />

            {/* Auréola de Destaque no Estado Ordenado */}
            <motion.circle
              cx={node.finalX}
              cy={node.finalY}
              r="16"
              stroke="#3B82F6"
              strokeWidth="1"
              fill="none"
              className="opacity-20"
              initial={{ scale: 0 }}
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: node.id * 0.3
              }}
            />
          </g>
        ))}

        {/* Legendas de Fluxo */}
        <motion.text
          x="100"
          y="150"
          fill="#475569"
          fontSize="10"
          fontFamily="monospace"
          className="tracking-wider opacity-60 font-semibold"
          initial={false}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
        >
          INPUT_CHAOS
        </motion.text>
        <motion.text
          x="440"
          y="150"
          fill="#2563EB"
          fontSize="10"
          fontFamily="monospace"
          className="tracking-wider opacity-90 font-semibold"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          OUTPUT_SIMPLE
        </motion.text>
      </svg>

      {/* Indicadores textuais dinâmicos */}
      <div className="absolute bottom-4 right-4 flex items-center gap-4 text-[10px] font-mono text-slate-500/80 uppercase">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Sincronizado</span>
        </div>
        <div>
          <span>Latência: 1.2ms</span>
        </div>
      </div>
    </div>
  );
};
export default SimplificationVisual;

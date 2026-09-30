"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import React, { useRef } from "react";

interface WordProps {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}

const Word: React.FC<WordProps> = ({ word, start, end, progress, reduceMotion }) => {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <motion.span style={{ opacity: reduceMotion ? 1 : opacity, display: "inline-block" }}>
      {word}
    </motion.span>
  );
};

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

// Texto do manifesto revelado palavra a palavra conforme o scroll passa pela
// seção: cada palavra vai de opacidade .18 a 1 na sua fatia da rolagem.
export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ text, className = "" }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  const n = words.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.3"] });

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / n;
        const end = Math.min(1, start + 1.6 / n);
        return <Word key={i} word={w} start={start} end={end} progress={scrollYProgress} reduceMotion={!!shouldReduceMotion} />;
      })}
    </p>
  );
};

export default ScrollRevealText;

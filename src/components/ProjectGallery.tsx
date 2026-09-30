"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Layers, 
  Eye,
  Check,
  Lock
} from "lucide-react";
import { ProjectGalleryItem } from "@/data/projects";

interface ProjectGalleryProps {
  items: ProjectGalleryItem[];
  projectSlug?: string;
  projectName: string;
}

export function ProjectGallery({ items, projectName }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentItem = items[currentIndex] || items[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen]);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Barra de Seleção Rápida / Tabs dos Módulos */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-brand-600" /> Módulos:
          </span>
          {items.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 font-medium flex items-center gap-1.5 ${
                  isActive
                    ? "bg-brand-950 text-white shadow-sm ring-1 ring-slate-800"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-brand-950"
                }`}
              >
                <span className={`text-[10px] font-mono ${isActive ? "text-brand-400" : "text-slate-400"}`}>
                  0{index + 1}
                </span>
                <span className="truncate max-w-[130px] sm:max-w-none">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Janela Principal do Navegador (Mockup Interativo) */}
      <div className="bg-brand-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all">
        {/* Barra Superior do Navegador */}
        <div className="bg-brand-950 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between gap-3">
          {/* Bolinhas macOS + Indicador Seguro Neutro */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800/60 text-[11px] font-mono text-slate-400">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Ambiente Protegido</span>
            </div>
          </div>

          {/* Indicador de tela + Controles */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/60 hidden md:inline-block">
              {currentIndex + 1} de {items.length}
            </span>

            {/* Setas Prev / Next */}
            <div className="flex items-center bg-slate-800/60 rounded-lg p-0.5 border border-slate-700/50">
              <button
                onClick={handlePrev}
                title="Tela anterior (Seta esquerda)"
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                title="Próxima tela (Seta direita)"
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Botão de Expandir / Fullscreen */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              title="Expandir imagem em tela cheia"
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-brand-600 px-2.5 py-1.5 rounded-lg border border-slate-700/60 transition"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px] font-medium">Ver tela cheia</span>
            </button>
          </div>
        </div>

        {/* Container da Imagem com Animação */}
        <div 
          onClick={() => setIsLightboxOpen(true)}
          className="relative bg-slate-950 cursor-zoom-in group overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[440px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-auto max-h-[600px] object-contain block transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Dica de clique para ampliar */}
          <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors pointer-events-none flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-xs font-semibold px-4 py-2 bg-brand-950/90 text-white rounded-full shadow-xl backdrop-blur-md border border-slate-700/80 flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-brand-400" /> Clique para ampliar em tela cheia
            </span>
          </div>
        </div>

        {/* Legenda Informativa da Tela Atual */}
        <div className="bg-brand-950/95 px-5 py-4 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm md:text-base font-bold text-white tracking-wide">
                {currentItem.title}
              </h4>
              {currentItem.category && (
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 font-medium">
                  {currentItem.category}
                </span>
              )}
            </div>
            <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
              {currentItem.caption}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center gap-1 transition"
            >
              Zoom detalhado <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Miniaturas Inferiores para Navegação Visual Rápida */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2.5 pt-1">
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative rounded-xl overflow-hidden border transition-all duration-200 group text-left flex flex-col ${
                isActive
                  ? "border-brand-600 ring-2 ring-brand-500/30 shadow-md scale-[1.02]"
                  : "border-slate-200/90 bg-slate-100 hover:border-slate-300 opacity-75 hover:opacity-100"
              }`}
            >
              <div className="aspect-[16/10] w-full bg-slate-950 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                {isActive && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-600 text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
              <div className="p-1.5 bg-white flex flex-col">
                <span className="text-[10px] font-bold text-slate-800 truncate block">
                  {item.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal Fullscreen */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6"
          >
            {/* Top Bar do Modal */}
            <div className="flex items-center justify-between text-white pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-brand-400 font-semibold uppercase tracking-wider">
                  {projectName}
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-sm font-semibold text-slate-200">{currentItem.title}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  {currentIndex + 1} de {items.length} (Use ← → ou ESC)
                </span>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Fechar (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Imagem Central em Resolução Alta */}
            <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden">
              {/* Botão Anterior Flutuante */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 md:left-6 z-10 p-3 rounded-full bg-brand-950/80 hover:bg-slate-800 text-white border border-slate-700/80 shadow-2xl backdrop-blur transition transform hover:scale-110"
                title="Tela anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-6xl max-h-[78vh] w-full h-full flex items-center justify-center p-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="max-h-[76vh] max-w-full w-auto object-contain rounded-xl shadow-2xl border border-slate-800"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Botão Próximo Flutuante */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 md:right-6 z-10 p-3 rounded-full bg-brand-950/80 hover:bg-slate-800 text-white border border-slate-700/80 shadow-2xl backdrop-blur transition transform hover:scale-110"
                title="Próxima tela"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Legenda Inferior do Modal */}
            <div className="bg-brand-950/90 border border-slate-800/80 rounded-2xl p-4 max-w-3xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h5 className="font-bold text-white text-sm">{currentItem.title}</h5>
                  {currentItem.category && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">
                      {currentItem.category}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {currentItem.caption}
                </p>
              </div>

              {/* Seletor de Miniaturas no Modal */}
              <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto max-w-full">
                {items.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-10 h-7 rounded overflow-hidden border transition ${
                      idx === currentIndex
                        ? "border-brand-500 ring-2 ring-brand-500/50"
                        : "border-slate-700 opacity-50 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumb.image}
                      alt={thumb.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

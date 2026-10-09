import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serviços renomeados/removidos no redesign v8 (301 = permanente).
  async redirects() {
    return [
      { source: "/servicos/automacoes", destination: "/servicos/camadas-agenticas", statusCode: 301 },
      { source: "/servicos/credenciamento-e-eventos", destination: "/servicos/sistemas-internos", statusCode: 301 },
      { source: "/servicos/formularios-inteligentes", destination: "/servicos", statusCode: 301 }
    ];
  },
  allowedDevOrigins: [
    "192.168.15.9",
    "192.168.15.9:3000",
    "192.168.15.2",
    "192.168.15.2:3000",
    "localhost",
    "localhost:3000",
    "127.0.0.1",
    "127.0.0.1:3000"
  ]
};

export default nextConfig;

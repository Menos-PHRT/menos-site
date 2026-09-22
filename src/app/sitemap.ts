import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://menos.studio";

  // Páginas institucionais estáticas
  const staticPages = [
    "",
    "/a-menos",
    "/servicos",
    "/projetos",
    "/parceiros",
    "/como-trabalhamos",
    "/contato",
    "/privacidade",
    "/termos"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));

  // Páginas individuais de serviços
  const servicePages = services.map((s) => ({
    url: `${baseUrl}/servicos/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  // Páginas individuais de projetos (estudos de caso)
  const projectPages = projects.map((p) => ({
    url: `${baseUrl}/projetos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticPages, ...servicePages, ...projectPages];
}

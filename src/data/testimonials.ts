export interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  company: string;
  projectSlug?: string;
  avatarUrl?: string; // foto opcional (deixaremos opcional com fallback visual de letras iniciais)
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    text: "A plataforma transformou a rotina do programa. Hoje temos clareza sobre o histórico e acompanhamento de cada bolsista, integrando mentorias, tutorias e a gestão em um ambiente organizado e acessível.",
    author: "Lorrane de Paula",
    role: "Coordenadora do Programa Melhores Cabeças",
    company: "Fundação Lucia e Pelerson Penido — FLUPP",
    projectSlug: "plataforma-melhores-cabecas"
  },
  {
    id: "t2",
    text: "Foi o primeiro ano em que não tivemos fila na porta e nem reclamações de certificados que não chegaram no e-mail. A solução funcionou de forma impecável.",
    author: "Natalia Vieira",
    role: "Coordenadora Geral de Eventos da FLUPP",
    company: "Fundação Lucia e Pelerson Penido — FLUPP",
    projectSlug: "sistema-de-credenciamento"
  },
  {
    id: "t3",
    text: "A reformulação da página do Prêmio trouxe uma apresentação muito mais convidativa e clara para os professores e estudantes. O fluxo de inscrição ficou simples, visualmente acolhedor e com feedback imediato.",
    author: "Natália Vieira",
    role: "Coordenadora do Projeto",
    company: "Fundação Lucia e Pelerson Penido — FLUPP",
    projectSlug: "reformulacao-paginas-institucionais"
  },
  {
    id: "t4",
    text: "O Coentro ERP transforma processos dispersos em uma operação integrada: o pedido é registrado, a comanda é organizada, o atendimento é acompanhado e a impressão acontece dentro do mesmo fluxo.",
    author: "Andresa Alcântara",
    role: "Proprietária",
    company: "Coentro",
    projectSlug: "integracao-coentro-erp"
  }
];

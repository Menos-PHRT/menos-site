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
    text: "A MENOS conseguiu traduzir nossas necessidades operacionais complexas em um sistema interno incrivelmente limpo. O tempo que nossa equipe gasta com burocracia diária despencou.",
    author: "Ana Souza",
    role: "Diretora de Operações",
    company: "Instituto Melhores Cabeças",
    projectSlug: "plataforma-melhores-cabecas"
  },
  {
    id: "t2",
    text: "Foi o primeiro ano em que realizamos o credenciamento de mais de 2 mil pessoas sem nenhuma fila ou confusão com certificados. A simplicidade técnica deles salvou o evento.",
    author: "Rodrigo Mota",
    role: "Coordenador Geral",
    company: "Festival Conexão Criativa",
    projectSlug: "sistema-de-credenciamento"
  },
  {
    id: "t3",
    text: "A reformulação do nosso site trouxe um ar contemporâneo e limpo que os clientes adoraram. A velocidade de carregamento é fantástica e a taxa de conversão dobrou.",
    author: "Renato Ramos",
    role: "Sócio-Diretor",
    company: "Apex Consultoria",
    projectSlug: "reformulacao-paginas-institucionais"
  },
  {
    id: "t4",
    text: "O Coentro ERP transforma processos dispersos em uma operação integrada: o pedido é registrado, a comanda é organizada, o atendimento é acompanhado e a impressão acontece dentro do mesmo fluxo.",
    author: "Proprietária",
    role: "Gestão Operacional",
    company: "Coentro",
    projectSlug: "integracao-coentro-erp"
  }
];

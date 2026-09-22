import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, city, solutionType, problemDescription, privacyConsent } = body;

    // Validação básica do lado do servidor
    if (!name || !email || !phone || !solutionType || !problemDescription || !privacyConsent) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes ou consentimento de privacidade não aceito." },
        { status: 400 }
      );
    }

    // Simular processamento (e.g. Envio de e-mail com Resend ou webhook de CRM)
    console.log("=== NOVO LEAD MENOS RECEBIDO ===");
    console.log("Nome:", name);
    console.log("Empresa/Projeto:", company || "Não informado");
    console.log("E-mail:", email);
    console.log("Telefone/WhatsApp:", phone);
    console.log("Cidade/Estado:", city || "Não informado");
    console.log("Solução Pretendida:", solutionType);
    console.log("Problema:", problemDescription);
    console.log("=================================");

    // Retorna resposta de sucesso
    return NextResponse.json({ success: true, message: "Lead recebido com sucesso!" });
  } catch (error) {
    console.error("Erro na rota de contato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao processar o contato." },
      { status: 500 }
    );
  }
}
export async function GET() {
  return NextResponse.json({ error: "Método não permitido." }, { status: 405 });
}

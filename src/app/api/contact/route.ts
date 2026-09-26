import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/firebaseAdmin";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      company,
      email,
      phone,
      city,
      solutionType,
      referredBy,
      problemDescription,
      deadline,
      budget,
      privacyConsent
    } = body;

    // Validação básica do lado do servidor
    if (!name || !email || !phone || !solutionType || !problemDescription || !privacyConsent) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes ou consentimento de privacidade não aceito." },
        { status: 400 }
      );
    }

    const leadData = {
      name: String(name).trim(),
      company: company ? String(company).trim() : null,
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      city: city ? String(city).trim() : null,
      solutionType: String(solutionType),
      referredBy: referredBy ? String(referredBy) : "Não informado",
      problemDescription: String(problemDescription).trim(),
      deadline: deadline ? String(deadline) : "Não especificado",
      budget: budget ? String(budget) : "Não especificado",
      createdAt: new Date().toISOString(),
      status: "novo"
    };

    console.log("=== NOVO LEAD RECEBIDO ===", leadData);

    // 1. Salvar no Firebase Firestore
    let savedToFirestore = false;
    try {
      const db = getDb();
      if (db) {
        const docRef = await db.collection("leads").add({
          ...leadData,
          serverTimestamp: new Date()
        });
        console.log("✅ Lead salvo no Firestore com ID:", docRef.id);
        savedToFirestore = true;
      } else {
        console.warn("⚠️ Firebase Admin não configurado no .env.local. Registro pulado no Firestore.");
      }
    } catch (firestoreError) {
      console.error("❌ Erro ao salvar no Firebase Firestore:", firestoreError);
      // Não interrompe o fluxo para tentar enviar o e-mail mesmo se o banco oscilar
    }

    // 2. Disparar notificação por E-mail via Resend
    let emailSent = false;
    const recipientEmail = process.env.NOTIFICATION_EMAIL || "menos.lab@gmail.com";
    const senderEmail = process.env.EMAIL_FROM || "MENOS Contato <onboarding@resend.dev>";

    if (resend) {
      try {
        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
            <div style="border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #0f172a; font-size: 20px; font-weight: 700;">Novo Lead Recebido pelo Site</h2>
              <span style="font-size: 12px; color: #64748b; font-family: monospace;">menos.studio &bull; ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</span>
            </div>

            <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #2563eb;">Dados do Contato</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; width: 140px;"><strong>Nome:</strong></td>
                  <td style="padding: 6px 0; color: #0f172a;">${leadData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>E-mail:</strong></td>
                  <td style="padding: 6px 0;"><a href="mailto:${leadData.email}" style="color: #2563eb; text-decoration: none;">${leadData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>WhatsApp / Tel:</strong></td>
                  <td style="padding: 6px 0;"><a href="https://wa.me/${leadData.phone.replace(/\D/g, "")}" style="color: #16a34a; text-decoration: none; font-weight: 600;">${leadData.phone} (Abrir no WhatsApp)</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Empresa:</strong></td>
                  <td style="padding: 6px 0; color: #0f172a;">${leadData.company || "Não informada"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Cidade / Estado:</strong></td>
                  <td style="padding: 6px 0; color: #0f172a;">${leadData.city || "Não informado"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Como conheceu:</strong></td>
                  <td style="padding: 6px 0; color: #0f172a;">${leadData.referredBy}</td>
                </tr>
              </table>
            </div>

            <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #2563eb;">Demanda e Projeto</h3>
              <p style="margin: 0 0 10px 0; font-size: 14px;"><strong>Tipo de Solução:</strong> <span style="display: inline-block; padding: 2px 8px; background: #eff6ff; color: #1d4ed8; border-radius: 4px; font-weight: 600;">${leadData.solutionType}</span></p>
              <p style="margin: 0 0 6px 0; font-size: 14px; color: #64748b;"><strong>Descrição do Problema:</strong></p>
              <div style="background: #f8fafc; border-left: 3px solid #2563eb; padding: 12px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${leadData.problemDescription}</div>
              <div style="margin-top: 14px; font-size: 13px; color: #64748b; display: flex; gap: 20px;">
                <span><strong>Prazo desejado:</strong> ${leadData.deadline}</span> &bull; 
                <span><strong>Expectativa de orçamento:</strong> ${leadData.budget}</span>
              </div>
            </div>

            <div style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 24px;">
              MENOS &bull; Simplificando processos e experiências digitais.
            </div>
          </div>
        `;

        await resend.emails.send({
          from: senderEmail,
          to: recipientEmail,
          replyTo: leadData.email,
          subject: `[Novo Contato] ${leadData.name} - ${leadData.solutionType}`,
          html: emailHtml
        });

        console.log("✅ E-mail enviado com sucesso via Resend para:", recipientEmail);
        emailSent = true;
      } catch (emailError) {
        console.error("❌ Erro ao enviar e-mail via Resend:", emailError);
      }
    } else {
      console.warn("⚠️ RESEND_API_KEY não configurada no .env.local. Envio de e-mail pulado.");
    }

    return NextResponse.json({
      success: true,
      message: "Lead recebido com sucesso!",
      savedToFirestore,
      emailSent
    });
  } catch (error) {
    console.error("Erro interno na rota de contato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao processar o contato." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Método não permitido." }, { status: 405 });
}

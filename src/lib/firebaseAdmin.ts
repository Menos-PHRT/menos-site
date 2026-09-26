import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

function getFirebaseAdmin(): App | null {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }

  // Opção 1: JSON completo da chave privada na variável de ambiente
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      return initializeApp({
        credential: cert(serviceAccount)
      });
    } catch (e) {
      console.error("Falha ao parsear FIREBASE_SERVICE_ACCOUNT_KEY:", e);
    }
  }

  // Opção 2: Campos individuais no .env
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    // Corrige quebras de linha caso venham escapadas como "\n"
    privateKey = privateKey.replace(/\\n/g, "\n");

    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
  }

  return null;
}

export function getDb(): Firestore | null {
  const app = getFirebaseAdmin();
  if (!app) return null;
  return getFirestore(app);
}

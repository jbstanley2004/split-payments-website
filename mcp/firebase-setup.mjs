import admin from "firebase-admin";

let loggedMissingEnv = false;

function formatPrivateKey(key) {
  return key.replace(/\\n/g, "\n");
}

export function getAdminDb() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    if (!loggedMissingEnv) {
      loggedMissingEnv = true;
      console.warn(
        "Firebase env vars are missing; falling back to in-memory profile storage."
      );
    }
    return null;
  }

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: formatPrivateKey(privateKey),
      }),
    });
  }

  return admin.firestore();
}

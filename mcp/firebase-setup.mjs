import admin from "firebase-admin";

function formatPrivateKey(key) {
  return key.replace(/\\n/g, "\n");
}

export function getAdminDb() {
  if (admin.apps.length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: formatPrivateKey(privateKey),
        }),
      });
    } else {
      console.log("Environment variables for Firebase not found. Attempting to use Application Default Credentials...");
      admin.initializeApp();
    }
  }
  return admin.firestore();
}

import admin from "firebase-admin";

function formatPrivateKey(key) {
  return key.replace(/\\n/g, "\n");
}

export function getAdminDb() {
  if (admin.apps.length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    const hasEnvCreds = projectId && clientEmail && privateKey;
    const forceKey = process.env.FIREBASE_FORCE_KEY === "true";

    // Prefer Application Default Credentials (ADC) so we can run keylessly on Cloud Run/GCE/GKE
    // or locally after `gcloud auth application-default login`. Fall back to env service account.
    if (!forceKey) {
      try {
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        });
        console.log("[firebase-setup] Initialized with Application Default Credentials.");
      } catch (err) {
        console.warn("[firebase-setup] ADC failed:", err.message);
      }
    }

    if (admin.apps.length === 0 && hasEnvCreds) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: formatPrivateKey(privateKey),
        }),
      });
      console.log("[firebase-setup] Initialized with service account env vars.");
    }

    if (admin.apps.length === 0) {
      console.warn("[firebase-setup] No credentials available; admin SDK calls will fail.");
      admin.initializeApp(); // last-resort to avoid crashing; will error on first call
    }
  }
  return admin.firestore();
}

import "server-only";
import admin from "firebase-admin";

interface FirebaseAdminConfig {
    projectId: string;
    clientEmail: string;
    privateKey: string;
}

function formatPrivateKey(key: string) {
    return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(config: FirebaseAdminConfig) {
    if (admin.apps.length > 0) {
        return admin.app();
    }

    return admin.initializeApp({
        credential: admin.credential.cert({
            projectId: config.projectId,
            clientEmail: config.clientEmail,
            privateKey: formatPrivateKey(config.privateKey),
        }),
    });
}

export function getAdminAuth() {
    const app = createFirebaseAdminApp({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!,
    });
    return app.auth();
}

export function getAdminDb() {
    const app = createFirebaseAdminApp({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!,
    });
    return app.firestore();
}

export function getAdminStorage() {
    const app = createFirebaseAdminApp({
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!,
    });
    return app.storage();
}

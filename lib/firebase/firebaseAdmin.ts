import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Adjust this as needed for your setup
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };

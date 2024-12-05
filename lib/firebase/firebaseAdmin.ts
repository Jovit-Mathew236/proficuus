import "server-only";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };

  // Validate environment variables
  Object.entries(params).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });

  const app = createFirebaseAdminApp(params);
  return app;
}

// New method to authenticate and verify a user
export async function authenticateAndVerifyUser(uid: string) {
  try {
    // Initialize Firebase Admin
    const app = await initAdmin();
    const auth = getAuth(app);

    // Verify the user exists and get their details
    const userRecord = await auth.getUser(uid);

    return {
      user: userRecord,
      isAuthenticated: true,
    };
  } catch (error) {
    console.error("Authentication verification error:", error);
    return {
      user: null,
      isAuthenticated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Method to delete a user by admin
export async function deleteUserByAdmin(uid: string) {
  try {
    // Initialize Firebase Admin
    const app = await initAdmin();
    const auth = getAuth(app);

    // Delete the user
    await auth.deleteUser(uid);

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.error("Admin user deletion error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown deletion error",
    };
  }
}

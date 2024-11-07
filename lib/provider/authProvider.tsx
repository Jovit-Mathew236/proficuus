"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "@/lib/firebase/config"; // Adjust this import path as needed
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase/config"; // Import Firestore instance
import {
  doc,
  getDoc,
  query,
  where,
  getDocs,
  collection,
  DocumentReference,
  DocumentData,
  Query,
  DocumentSnapshot,
} from "firebase/firestore"; // Import Firestore functions
import { setCookie } from "nookies"; // Install nookies if you haven't already

interface AuthContextType {
  user: User | null;
  username: string | null; // Add username to context
  userImage: string | null; // Add userImage to context
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  username: null,
  userImage: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null); // State for username
  const [userImage, setUserImage] = useState<string | null>(null); // State for userImage
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      setLoading(true);

      if (!user) {
        router.push("/proficuus24/login");
      } else {
        // Set the cookie with the user email
        setCookie(null, "user_email", user.email || "", {
          path: "/",
          maxAge: 30 * 24 * 60 * 60, // Cookie expires in 30 days
          secure: process.env.NODE_ENV === "production", // Use secure cookie in production
          sameSite: "lax",
        });

        // Check if the user has a `uid` or `email`
        let userDocRef:
          | DocumentReference<DocumentData>
          | Query<DocumentData>
          | null = null;
        let docSnap: DocumentSnapshot<DocumentData> | null = null;

        if (user.uid) {
          // If user has a UID, query the "participants" collection
          userDocRef = doc(db, "participants", user.uid);
          docSnap = await getDoc(userDocRef);
        } else if (user.email) {
          // If user has an email, query the "volunteers" collection
          userDocRef = query(
            collection(db, "volunteers"),
            where("email", "==", user.email)
          );
          const volunteerSnapshot = await getDocs(userDocRef as Query);
          docSnap = volunteerSnapshot.empty ? null : volunteerSnapshot.docs[0];
        }

        if (docSnap?.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username || null);
          setUserImage(userData.imageUrl || null);
        } else {
          console.error(
            "No such document in participants or volunteers collection!"
          );
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, username, userImage, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

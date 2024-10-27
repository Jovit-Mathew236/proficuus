import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config"; // Import your Firebase auth instance
import { setCookie } from "cookies-next"; // Use a library to set cookies easily

const allowedEmails = ["admin@jymest.com"];

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!allowedEmails.includes(email)) {
    return NextResponse.json(
      { message: "Email not allowed for login." },
      { status: 403 }
    );
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      // Set a cookie with the user's UID or a token
      setCookie("authToken", user.uid, { maxAge: 60 * 60 * 24 }); // 1 day expiry
      return NextResponse.json(
        { uid: user.uid, email: user.email },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
  } catch (error) {
    console.error("Error signing in user:", error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}

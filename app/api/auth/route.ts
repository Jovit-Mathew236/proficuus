import { NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config"; // Import your Firebase auth instance

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return NextResponse.json(
      { uid: user.uid, email: user.email },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error signing in user:", error);
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}

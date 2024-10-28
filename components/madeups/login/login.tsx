"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function Login() {
  const router = useRouter();
  const [signInWithEmailAndPassword, loading] =
    useSignInWithEmailAndPassword(auth);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  // const allowedEmails = ["admin@jymest.com"];
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
    return unsubscribe;
  }, [router]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setErrorMessage(""); // Reset error message

    // if (!allowedEmails.includes(data.email)) {
    //   toast({
    //     title: "This email is not allowed",
    //     description: "Please use another email",
    //     variant: "destructive",
    //   });
    //   return; // Exit early if the email is not allowed
    // }

    try {
      // Attempt to sign in the user
      const userCredential = await signInWithEmailAndPassword(
        data.email,
        data.password
      );

      // If sign in is successful, userCredential will contain user data
      if (userCredential) {
        toast({
          title: "Login Successful",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Please relax with Jesus😉</code>
            </pre>
          ),
        });
        router.push("/dashboard"); // Redirect to the dashboard on success
      }
    } catch (error) {
      // Handle errors (e.g., wrong credentials, etc.)
      setErrorMessage((error as Error).message); // Set the error message
      toast({
        title: "Login Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 max-w-[400px]"
      >
        <h1 className="text-3xl font-bold">Proficuus Login</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{loading ? "Logging in..." : "Login"}</Button>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </form>
    </Form>
  );
}

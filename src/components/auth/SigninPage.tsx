"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase.config";
import { useGetCookie, useSetCookie } from "@/hooks/useCookies";

export default function SigninPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, firebaseError] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        useSetCookie("userEmail", email, 7); // Assuming useSetCookie works with this signature
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } catch (e) {
      console.error("Error during sign-in:", e);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (useGetCookie("userEmail")) {
      router.push("/");
    }
  }, [router]);

  return (
    <section className="flex items-center justify-center h-[80dvh] lg:min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md md:shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-500">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                placeholder="Enter your password"
              />
            </div>
            <Button variant="primary" className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center text-gray-500">
          Don’t have an account? &nbsp;
          <a href="/auth/register" className="text-blue-500 hover:underline">Sign up</a>
        </CardFooter>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {firebaseError && <p className="text-red-500 text-center mb-4">{firebaseError.message}</p>}
      </Card>
    </section>
  );
}

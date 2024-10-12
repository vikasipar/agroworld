"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase.config";
import { useRouter } from "next/navigation";
import { useGetCookie } from "@/hooks/useCookies";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"user" | "provider">("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, firebaseError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword || !name || !role) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res) {
        // Post user data to MongoDB API
        const response = await fetch("/api/users/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            role,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          router.push("/");
        } else {
          setError("Error saving user to MongoDB: " + result.error);
        }
      } else {
        setError("User creation failed. Please try again.");
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (useGetCookie("userEmail")) {
      router.push("/");
    }
  }, []);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md md:shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-500">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {firebaseError && (
            <p className="text-red-500 text-center mb-4">
              {firebaseError.message}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-base font-medium">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="none" className="text-base font-medium">
                Role
              </Label>
              <RadioGroup
                defaultValue="option-one"
                className="flex justify-start items-center gap-x-8"
              >
                <div
                  className="flex items-center space-x-2"
                  onClick={() => setRole("user")}
                >
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">User</Label>
                </div>
                <div
                  className="flex items-center space-x-2"
                  onClick={() => setRole("provider")}
                >
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Provider</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-base font-medium">
                Email
              </Label>
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
            <div className="space-y-1">
              <Label htmlFor="password" className="text-base font-medium">
                Password
              </Label>
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
            <div className="space-y-1">
              <Label htmlFor="confirm-password" className="text-base font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full"
                placeholder="Confirm your password"
              />
            </div>
            <Button
              variant="primary"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center text-gray-500">
          Already have an account? &nbsp;
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </CardFooter>
      </Card>
    </section>
  );
}

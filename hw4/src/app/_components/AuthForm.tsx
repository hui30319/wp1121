"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import toast from "react-hot-toast";

import { publicEnv } from "@/lib/env/public"
import AuthInput from "./AuthInput"
import Image from "next/image";

export default function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users")
    }
  }, [session?.status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: sign in logic
    signIn("credentials", {
      email,
      username,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/users`,
      redirect: false,
    })
    .then((callback) => {
      if (callback?.error) {
        toast.error("Error!");
      }
      if (callback?.ok && !callback.error){
        router.push("/users")
        toast.success("Success!")
      }});
  };

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>Sign {isSignUp ? "Up" : "In"}</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          {isSignUp && (
            <AuthInput
              label="Username"
              type="text"
              value={username}
              setValue={setUsername}
            />
          )}
          <AuthInput
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          {isSignUp && (
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
          )}
          <div className="text-sm text-gray-500">
            {isSignUp ? (
              <span>
                Already have an account?{" "}
                <a
                  className="cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </a>
              </span>
            ) : (
              <span>
                Do not have an account?{" "}
                <a
                  className="cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </a>
              </span>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign {isSignUp ? "Up" : "In"}
          </Button>
        </form>
        <div className="flex w-full items-center gap-1 py-2">
          <div className="h-[1px] grow border-t"></div>
          <p className="text-xs text-gray-400">or</p>
          <div className="h-[1px] grow border-t"></div>
        </div>

        <Button
          onClick={async () => {
            // TODO: sign in with github
            signIn("github", {
              callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/users`,
            })
          }}
          className="flex w-full"
          variant={"outline"}
        >
          {/* Remember to copy "github.png" to ./public folder */}
          <Image src="/github.png" alt="github icon" width={20} height={20} />
          <span className="grow">Sign In with Github</span>
        </Button>
      </CardContent>
    </Card>
    );
}

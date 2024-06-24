"use client";
import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/lib/auth";
import { AuthError } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithCredentials } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import  Link from "next/link";

const SIGNIN_ERROR_URL = "/error";

interface ILogin {
  phone: string;
  password: string;
}

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const formatPhoneNumber = (value: string) => {
    value = value.replace(/\D/g, "");

    // Format the number according to the pattern +7(XXX) XXX-XX-XX
    if (value.length <= 1) {
      return `+7(${value}`;
    } else if (value.length <= 4) {
      return `+7(${value.substring(1, 4)}`;
    } else if (value.length <= 7) {
      return `+7(${value.substring(1, 4)}) ${value.substring(4, 7)}`;
    } else if (value.length <= 9) {
      return `+7(${value.substring(1, 4)}) ${value.substring(
        4,
        7
      )}-${value.substring(7, 9)}`;
    } else {
      return `+7(${value.substring(1, 4)}) ${value.substring(
        4,
        7
      )}-${value.substring(7, 9)}-${value.substring(9, 11)}`;
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id} // Add a unique "key" prop
          className="max-w-xs mx-auto"
          action={async () => {
            try {
              await signIn(provider.id);
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }

              // Otherwise if a redirects happens NextJS can handle it
              // so you can just re-thrown the error and let NextJS handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          {provider.name === "GitHub" && (
            <Button
              type="submit"
              className="bg-black hover:bg-gray-600 text-white mt-2"
            >
              <span className="mr-2">Sign in with</span>{" "}
              <Image
                src="/github-mark.svg"
                alt=""
                width={37}
                height={37}
                priority
              />
            </Button>
          )}
          {provider.name === "Google" && (
            <Button
              type="submit"
              className="bg-white hover:bg-gray-300 mt-2 shadow-lg text-black"
            >
              <span className="mr-2">Sign in with</span>{" "}
              <Image
                src="/google-48.svg"
                alt=""
                width={37}
                height={37}
                priority
              />
            </Button>
          )}
        </form>
      ))}
      <form
        className="max-w-xs mx-auto"
        action={async () => {
          try {
            await signInWithCredentials({ phone, password });
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <div className="flex flex-col gap-2">
          <Input
            {...register("phone", { required: "Phone is required" })}
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={handlePhoneNumberChange}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
          <Input
            {...register("password", { required: "Password is required" })}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <Link href="/register"        
          >Don't have a account?</Link>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white mt-2"
          >
            <span className="mr-2">Sign in</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

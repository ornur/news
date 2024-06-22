"use client";
import React, { useState } from "react";
import { userRegister } from "@/lib/db";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

const SIGNIN_ERROR_URL = "/error";

interface IRegister {
  name: string;
  phone: string;
  password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = async () => {
    if (name && phone && password) {
      setLoading(true);
      try {
        const user = await userRegister(name, phone, password,);
        // if (user.token) {
        //   localStorage.setItem("token", user.token);
        // }
        redirect("/login"); 
      } catch (e) {
        console.error(e);
        // const errorData = e as AuthError;
        // redirect(`${SIGNIN_ERROR_URL}?error=${errorData.error}`);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Please enter a name, phone number, and password");
    }
  };

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
    <form className="max-w-xs mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Input
          type="text"
          {...register("phone", { required: "Phone is required" })}
          placeholder="Phone"
          value={phone}
          onChange={handlePhoneNumberChange}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <Input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <Link href="/login">Already have account?</Link>

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white mt-2"
          disabled={loading}
        >
          <span className="mr-2">Sign in</span>
        </Button>
      </div>
    </form>
  );
}

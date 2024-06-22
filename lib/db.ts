"use server"
import axios from "axios";
import { redirect } from "next/navigation";
import { AuthError} from "next-auth";
import { signIn } from "../lib/auth";

const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.13:8080',
    withCredentials: true,
});

export const signInWithCredentials = async (credentials:{
  phone: string;
  password: string;
}) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });
    
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`error?error=${error.type}`);
    }
    throw error;
  }
};

export const userRegister = async (name: string, phone: string, password: string) => {
  try {
    const response = await axiosInstance.post("/register", {
      name,
      phone,
      password,
    });

    if (response.data.token){
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export type SelectPost = ReturnType<typeof getPosts> extends Promise<infer T> ? T : never;

export async function getPosts() {
  // const token = localStorage.getItem("token");
  // if (!token) {
  //   // No authorization token redirect to login page
  //   redirect("/login");
  // }
  // try {
  //   const response = await axiosInstance.get("protected/posts", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   return response.data;
  // } catch (error) {
  //   throw error;
  // }
}

export async function deletePostById(id: number) {
  // const token = localStorage.getItem("token");
  // if (!token) {
  //   redirect("/login");
  // }
  // try{
  //   const response = await axiosInstance.delete(`protected/posts/${id}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   return response.data;
  // }catch(error){
  //   throw error;
  // }
}
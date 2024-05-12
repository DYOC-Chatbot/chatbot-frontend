"use server";

import { LogInPostData, SignUpPostData, User } from "@/types/users/auth";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { API } from "./base";

export async function logIn(data: LogInPostData) {
  const response = await fetch(`${API}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw Error("invalid username or password");
  }

  const responseData = (await response.json()) as { data: string };

  cookies().set("token", responseData.data!, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  return;
}

export async function signUp(data: SignUpPostData) {
  const response = await fetch(`${API}/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return;
}

export async function getCurrentUser(): Promise<User | undefined> {
  const cookie = cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return;
  }

  try {
    const decoded = decodeJwt(token);
    return {
      id: decoded.id as number,
      username: decoded.username as string,
    };
  } catch (err) {
    return;
  }
}

export async function logOut() {
  const cookie = cookies();
  cookie.delete("token");
}

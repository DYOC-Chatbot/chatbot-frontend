"use client";

import { logOut } from "@/api/auth";
import { Button } from "../ui/button";
import { User } from "@/types/users/auth";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user: User | undefined;
}

export const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };
  return (
    <div className="p-4 bg-slate-200 flex justify-between content-center">
      <div className="font-semibold m-2">A Navbar</div>
      {user && <Button onClick={handleLogout}>Log Out</Button>}
    </div>
  );
};

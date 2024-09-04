"use client";
import React, { use } from "react";
import Link from "next/link";
// import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "../ui/button";
import LoginModal from "../auth/LoginModal";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import LogoutModal from "../auth/LogoutModal";
import ProfileMenu from "../dashboard/ProfileMenu";
// import LoginModal from "../auth/LoginModal";

export default function Navbar({ user }: { user?: CustomUser }) {

  console.log(" here is user " + JSON.stringify(user));

  return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm px-12 pr-16">
      <h1 className="text-xl md:text-2xl font-extrabold">QuickChat</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        <Link href="/">Home</Link>
        <Link href="#features">Features</Link>
        {!user ? (
          <LoginModal />
        ) : (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>
            <ProfileMenu img={user.image ? user.image : "https://github.com/shadcn.png"} name={user.name ? user.name : 'Username'} />
          </>
        )}
      </div>
    </nav>
  );
}
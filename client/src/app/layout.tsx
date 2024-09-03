import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SessionProvider from "@/providers/sessionProvider";
import Navbar from "@/components/base/Navbar";
import { authOption, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Quik Chat",
  description: "QuikChat is a real-time chat application built using modern technologies like Socket.io, Kafka, Redis, Postgres, and Next.js. It leverages TypeScript for type safety, shadcn for UI components, and Tailwind CSS for styling, delivering a scalable and efficient messaging platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  const session: CustomSession | null = await getServerSession(authOption)

  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Navbar  user={session?.user}/>
          {children}</body>
      </SessionProvider>
    </html>
  );
}

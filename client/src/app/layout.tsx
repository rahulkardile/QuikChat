import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Quik Chat",
  description: "QuikChat is a real-time chat application built using modern technologies like Socket.io, Kafka, Redis, Postgres, and Next.js. It leverages TypeScript for type safety, shadcn for UI components, and Tailwind CSS for styling, delivering a scalable and efficient messaging platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >{children}</body>
    </html>
  );
}

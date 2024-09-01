import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}

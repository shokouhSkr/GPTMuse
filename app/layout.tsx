import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "OpenCity AI",
  description:
    "OpenCity AI: Your AI language companion. Powered by OpenAI, it helps you find the most beautiful places in the world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-primary">
        <body className={`${inter.className}`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

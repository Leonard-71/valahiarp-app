import type { Metadata } from "next";
import { Cinzel, Inter, Rye } from "next/font/google";
import { ReactNode } from "react";

import { Footer } from "@/components/custom/footer/footer";
import { Header } from "@/components/custom/header";
import { Toaster } from "@/components/ui/sonner";

import AuthProvider from "../../auth-provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
});

const rye = Rye({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rye",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Valahia RP",
    default: "Valahia RP",
  },
  description:
    "Server RedM de roleplay cinematic în Vestul Sălbatic. Frăție, frontieră și legendă.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${inter.variable} ${cinzel.variable} ${rye.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="relative z-10 flex h-full flex-1 flex-col">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

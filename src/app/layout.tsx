import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatfunny",
  description:
    "Crea chats ficticios de WhatsApp, Instagram, Facebook, Messenger, y compártelos en tus redes sociales para hacer bromas.",
  openGraph: {
    title: "Chatfunny",
    description:
      "Crea chats ficticios de WhatsApp, Instagram, Facebook, Messenger, y compártelos en tus redes sociales para hacer bromas.",
    url: "https://chatfunny.vercel.app/",
    siteName: "Chatfunny",
    images: [
      {
        url: "https://chatfunny.vercel.app/",
        width: 480,
        height: 480,
        alt: "Vista previa de Chatfunny",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatfunny",
    description:
      "Crea chats ficticios de WhatsApp, Instagram, Facebook, Messenger, y compártelos en tus redes sociales.",
    images: ["https://chatfunny.vercel.app/"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

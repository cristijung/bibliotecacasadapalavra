import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WrapperLayout from "./WrapperLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biblioteca Casa Da Palavra",
  description:
    "A melhor, mais barata e completa biblioteca física e online da nossa cidade! Sua casa para histórias e conhecimento. Descubra mundos e conecte-se com a magia da leitura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <WrapperLayout>
        {children}
       </WrapperLayout>
      </body>
    </html>
  );
}

"use client";

import React, { ReactNode } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";

interface WrapperLayoutProps {
  children: ReactNode;
}

export default function WrapperLayout({ children }: WrapperLayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main>
          <FavoritesProvider>{children}</FavoritesProvider>
        </main>
        <Footer />
      </div>
    </>
  );
}

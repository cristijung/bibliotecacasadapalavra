"use client";

import React, { ReactNode } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
//import styles from './WrapperLayout.module.scss'; // se precisar tem q criar depois

interface WrapperLayoutProps {
  children: ReactNode;
}

export default function WrapperLayout({ children }: WrapperLayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}

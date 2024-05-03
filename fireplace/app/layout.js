import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

import React from "react";
import ToggleButton from "./button.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fireplace Palace",
  description: "Book your new fireplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Header />

          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}

// Header component Function
function Header() {
  return (
    <header>
      <Image
        src="/imgs/fireplaceLogo.png"
        width={120}
        height={100}
        alt="Logo for the fireplace palace"
        className="fireplaceLogo"
      />
      <ToggleButton />
    </header>
  );
}

// Footer component function
function Footer() {
  return (
    <footer>
      <div className="findUs">
        Find us on:
        <br />
        <br />
        Facebook
        <br />
        Instagram
        <br />
        Tiktok
      </div>
      <div className="copyRight">
        © Fireplace Palace
        <br />
        <br />
        <a href="#">info@firepalace.co.uk</a>
      </div>
    </footer>
  );
}

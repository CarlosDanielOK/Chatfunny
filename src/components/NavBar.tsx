"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SearchBar } from "./SerachBar";
import { NavBarResponsive } from "./NavBarResponsive";
import { StarBorder } from "./animations/StarBorder";

export const NavBar = () => {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <header className="flex shadow-white text-white h-14 items-center justify-between px-2 relative my-0.5">
      {/* Logo y título */}
      <section className="flex items-center gap-2 w-36">
        <Link href="/" className="w-11 h-11">
          <Image
            src="/logo.png"
            width={480}
            height={480}
            alt="Logo"
            className="rounded-xl"
          />
        </Link>
        <Link href="/">
          <h1 className="font-bold">Chatfunny</h1>
        </Link>
      </section>

      {/* Menú de navegación y botón de búsqueda */}
      <nav className="hidden sm:flex gap-4 items-center">
        <Link href="/whatsapp" className="relative group">
          WhatsApp
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </Link>
        <Link href="/instagram" className="relative group">
          Instagram
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </Link>
        <Link href="/facebook" className="relative group">
          Facebook
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </Link>
        <Link href="/facebook" className="relative group hidden md:block">
          Messenger
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </Link>
        <SearchBar
          searchActive={searchActive}
          setSearchActive={setSearchActive}
        />
      </nav>

      {/* Sobre mi */}
      <div className="hidden sm:block">
        <StarBorder
          as="button"
          className="custom-class"
          color="rgb(230, 0, 35)"
          speed="6s"
          onClick={() => {
            const section = document.getElementById("cards-section");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Crear chat
        </StarBorder>
      </div>

      {/* Menú de navegación y botón de búsqueda para dispositivos móviles */}
      <section className="flex items-center justify-center gap-3 sm:hidden">
        <SearchBar
          searchActive={searchActive}
          setSearchActive={setSearchActive}
        />
        <NavBarResponsive />
      </section>
    </header>
  );
};

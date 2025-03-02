"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SearchBar } from "./SerachBar";
import { NavBarResponsive } from "./NavBarResponsive";

export const NavBar = () => {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <header className="flex bg-[#252728] text-white h-14 shadow-xl items-center justify-between px-2 relative">
      {/* Logo y título */}
      <section className="flex items-center gap-1 w-36">
        <Link href="/" className="w-12 h-12">
          <Image src="/logo.png" width={479} height={480} alt="Logo" />
        </Link>
        <Link href="/">
          <h1 className="font-bold">Chat Store</h1>
        </Link>
      </section>

      {/* Menú de navegación y botón de búsqueda */}
      <nav className="hidden sm:flex gap-4 items-center">
        <Link href="/" className="relative group">
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
        {/* <Link href="/sobremi" className="relative group">
          Sobre mí
          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </Link> */}
        {/* <SearchBar
          searchActive={searchActive}
          setSearchActive={setSearchActive}
        /> */}
      </nav>

      {/* Acciones: Iniciar sesión y Registrarte */}
      <section className="hidden sm:flex gap-2 w-36 items-center justify-end">
        <Link
          href="/sobremi"
          className="bg-[#0866FF] text-white px-3 py-2 text-center rounded-full hover:bg-blue-700 transition"
        >
          Sobre mí
        </Link>
      </section>

      {/* Menú de navegación y botón de búsqueda para dispositivos móviles */}
      <section className="flex items-center justify-center gap-3 sm:hidden">
        {/* <SearchBar
          searchActive={searchActive}
          setSearchActive={setSearchActive}
        /> */}
        <NavBarResponsive />
      </section>
    </header>
  );
};

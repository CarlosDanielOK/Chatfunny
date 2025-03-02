"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const NavBarResponsive: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left lg:hidden">
      <button
        onClick={toggleMenu}
        className="w-12 h-12 flex items-center justify-center"
      >
        <Image
          src="/fotodeperfil.png"
          width={400}
          height={400}
          alt="foto de perfil"
          className="h-12 w-12 rounded-full object-cover aspect-square"
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-1 w-56 rounded-md bg-[#242627] ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href="/"
              className="h-10 flex items-center gap-2 rounded-md m-2 px-2 hover:bg-[#3b3d3e]"
            >
              <Image
                src="/whatsapp.png"
                width={480}
                height={480}
                alt="WhatsApp"
                className="h-7 w-7 rounded-md"
              />
              <p>WhatsApp</p>
            </Link>
            <Link
              href="/instagram"
              className="h-10 flex items-center gap-2 rounded-md m-2 px-2 hover:bg-[#3b3d3e]"
            >
              <Image
                src="/instagram.png"
                width={480}
                height={480}
                alt="Instagram"
                className="h-7 w-7 rounded-md"
              />
              <p>Instagram</p>
            </Link>
            <Link
              href="/facebook"
              className="h-10 flex items-center gap-2 rounded-md m-2 px-2 hover:bg-[#3b3d3e]"
            >
              <Image
                src="/facebook.png"
                width={480}
                height={480}
                alt="Facebook"
                className="h-7 w-7 rounded-md"
              />
              <p>Facebook</p>
            </Link>
            <Link
              href="/"
              className="h-10 flex items-center gap-2 rounded-md m-2 px-2 hover:bg-[#3b3d3e]"
            >
              <Image
                src="/sobremi.png"
                width={480}
                height={480}
                alt="Sobre mí"
                className="h-7 w-7 rounded-md"
              />
              <p>Sobre mí</p>
            </Link>
            <Link
              href="/login"
              className="h-10 flex items-center gap-2 rounded-md m-2 px-2 hover:bg-[#3b3d3e]"
            >
              <p>Iniciar sesión</p>
            </Link>
            <Link
              href="/signup"
              className="h-10 flex items-center gap-2 rounded-md m-2 px-2 hover:bg-[#3b3d3e]"
            >
              <p>Registrarte</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

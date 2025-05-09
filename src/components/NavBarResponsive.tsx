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
    <div className="relative inline-block text-left sm:hidden">
      <button
        onClick={toggleMenu}
        className="w-12 h-12 flex items-center justify-center"
      >
        <Image
          src="/Carlos.jpg"
          width={400}
          height={400}
          alt="foto de perfil"
          className="h-11 w-11 rounded-full object-cover aspect-square"
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
              href="/whatsapp"
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
              href="/messenger"
              className="h-10 flex items-center gap-2 rounded-md m-2 px-2 hover:bg-[#3b3d3e]"
            >
              <Image
                src="/messenger.png"
                width={480}
                height={480}
                alt="Messenger"
                className="h-7 w-7 rounded-md"
              />
              <p>Messenger</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

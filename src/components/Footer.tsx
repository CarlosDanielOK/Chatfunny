import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

export const Footer = () => {
  return (
    <footer className="py-6 mt-10 px-2 border-t border-[#272727] w-full flex flex-col items-center justify-center">
      <div className="flex justify-center items-center space-x-14">
        <section className="">
          <p className="text-[#f2f2f280] text-sm">CONTACTO</p>

          <Link
            href="mailto:carlosdaniellazo06@gmail.com"
            className="flex items-center space-x-2"
          >
            <p>Email</p>
            <GoArrowUpRight />
          </Link>
          <Link
            href="https://www.linkedin.com/in/carlos-daniel-lazo/"
            target="_blank"
            className="flex items-center space-x-2"
          >
            <p>LinkedIn</p>
            <GoArrowUpRight />
          </Link>
        </section>
      </div>

      <div className="mt-12 text-center">
        <p>&copy; 2025 Carlos Lazo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

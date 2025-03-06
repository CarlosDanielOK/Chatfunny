import Link from "next/link";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="py-12 px-2 border-t border-[#272727] w-full flex flex-col items-center justify-center mt-10">
      <h3 className="text-[#f2f2f280]">CONTACTO</h3>
      <div className="flex justify-center items-center space-x-8 mt-2">
        <Link
          href="https://www.instagram.com/daniel_swan_ok?igsh=dGtjd3ptY3V6OWth"
          target="_blank"
          className="flex items-center space-x-1"
        >
          <p>Instagram</p>
          <FaInstagram />
        </Link>
        <Link
          href="https://www.tiktok.com/@carlosdanielok?_t=ZM-8uPq40k3VBO&_r=1"
          target="_blank"
          className="flex items-center space-x-1"
        >
          <p>TikTok</p>
          <FaTiktok />
        </Link>
      </div>
      <div className="mt-6 text-center">
        <p>&copy; 2025 Carlos Daniel. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

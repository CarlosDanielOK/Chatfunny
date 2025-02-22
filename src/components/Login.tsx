"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const imagenes = ["/screenshot1.png", "/screenshot2.png", "/screenshot3.png"];

export const LoginComponent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Comenzamos fade-out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
        setIsFading(false); // Fade-in al cambiar la imagen
      }, 500); // Duración del fade out (500ms)
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex items-center justify-center bg-[#1a3142] md:bg-black">
      <div className="w-[95vw] max-w-[1000px] h-[100vh] flex justify-center">
        {/* Imagenes de la app */}
        <section className="hidden w-1/2 md:flex justify-center items-center">
          <div className="h-full w-[22rem] bg-[url(/screenshot1.png)] bg-left bg-no-repeat flex flex-col items-center justify-center">
            <Image
              src={imagenes[currentImageIndex]}
              width={600}
              height={600}
              alt="foto"
              className={`w-64 self-end mt-7 transition-opacity duration-500 ease-in ${
                isFading ? "opacity-50" : "opacity-100"
              }`}
            />
          </div>
        </section>

        {/* Formulario de login */}
        <section className="w-full h-full md:w-1/2 flex items-center justify-center">
          <div className="w-full md:border md:border-[#363636] rounded-sm md:bg-transparent py-6 md:py-10 md:w-[85%]">
            <article className="flex flex-col items-center gap-1 mb-6">
              <Image
                src="/logo.png"
                width={479}
                height={480}
                alt="Chat Store"
                className="w-16 h-16"
              />
              <h1 className="text-2xl font-bold">Chat Store</h1>
            </article>
            <form className="flex flex-col gap-4 px-2 md:px-8">
              <div>
                <label htmlFor="email">
                  Correo electrónico o nombre de usuario
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Correo electrónico o usuario"
                  className="w-full h-12 bg-[#1c2b33] md:bg-[#121212] p-2 border border-[#465a69] rounded-md focus:border-white focus:outline-none focus:ring-0 focus:ring-white"
                />
              </div>
              <div>
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  className="w-full h-12 bg-[#1c2b33] md:bg-[#121212] p-2 border border-[#465a69] rounded-md focus:border-white focus:outline-none focus:ring-0 focus:ring-white"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#0064e0] rounded-full font-bold"
              >
                Iniciar sesión
              </button>

              <div className="flex items-center justify-center gap-2">
                <hr className="w-1/2 border-t border-[#465a69]" />
                <p className="text-[#465a69]">o</p>
                <hr className="w-1/2 border-t border-[#465a69]" />
              </div>

              <Link
                href="/signup"
                className="w-full h-12 rounded-full flex items-center justify-center text-[#0064e0] border-2 border-[#0064e0] font-bold"
              >
                Crear cuenta nueva
              </Link>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

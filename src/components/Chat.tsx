"use client";

import React from "react";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCall } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiSticker } from "react-icons/pi";
import { IoAttach } from "react-icons/io5";
import { MdOutlineCameraAlt } from "react-icons/md";
import { BiSolidMicrophone } from "react-icons/bi";
// import styles from "./Chat.module.css";

export const ChatComponent: React.FC = () => {
  return (
    <main className="w-screen h-screen overflow-hidden flex justify-center">
      <div
        className="w-full h-full max-w-[440px] text-white relative min-w-screen min-h-screen"
        style={{
          backgroundImage: "url(/fondochat.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* CONTACTO: ARRIBA */}
        <section className="h-16 w-full flex justify-between items-center px-1 bg-[#0b1014]">
          <div className="h-full w-64 flex items-center">
            <IoMdArrowBack className="h-6 w-6" />
            <Image
              src="/kokushibo.jpg"
              width={400}
              height={400}
              alt="foto de perfil"
              className="h-12 w-12 rounded-full object-cover aspect-square"
            />
            <article className="px-2 overflow-hidden max-[290px]:w-20">
              <h2 className="text-lg overflow-hidden text-nowrap text-ellipsis">
                Naruto Uzumaki
              </h2>
              <p className="text-sm overflow-hidden text-nowrap text-ellipsis">
                últ. vez hoy a las 02:02
              </p>
            </article>
          </div>
          <div className="h-full flex items-center gap-3">
            <BiVideo className="h-6 w-6" />
            <MdOutlineCall className="h-6 w-6" />
            <BsThreeDotsVertical className="h-6 w-6" />
          </div>
        </section>

        {/* ENVIAR MENSAJES: ABAJO */}
        <section className="bg-[#0b1014] h-16 w-full absolute bottom-0 flex items-center gap-2 px-2">
          {/* Contenedor del input y los íconos */}
          <article className="bg-[#1f272a] h-12 flex items-center rounded-full px-3 w-full max-w-[85%] min-w-[150px]">
            {/* Iconos iniciales con tamaño fijo */}
            <PiSticker className="w-6 h-6 min-w-6 text-gray-400" />

            {/* Input responsivo */}
            <input
              type="text"
              placeholder="Mensaje"
              className="flex-1 text-lg bg-transparent text-white px-2 py-2 outline-none min-w-0"
            />

            {/* Iconos finales con tamaño fijo */}
            <IoAttach className="w-6 h-6 min-w-6 mr-2 text-gray-400" />
            <MdOutlineCameraAlt className="w-6 h-6 min-w-6 text-gray-400" />
          </article>

          {/* Botón del micrófono con tamaño mínimo */}
          <article className="bg-[#21c063] w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center">
            <BiSolidMicrophone className="h-6 w-6 text-black" />
          </article>
        </section>
      </div>
    </main>
  );
};

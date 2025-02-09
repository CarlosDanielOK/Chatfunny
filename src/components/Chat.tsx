"use client";

import React from "react";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCall } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
// import styles from "./Chat.module.css";

export const ChatComponent: React.FC = () => {
  return (
    <main>
      <div
        className="w-[100vw] h-[100vh] max-w-[440px] text-white"
        style={{
          backgroundImage: "url(/fondochat.png)",
          backgroundSize: "cover",
        }}
      >
        <section className="h-16 w-full flex justify-between items-center px-1 bg-[#0b1014]">
          <div className="h-full w-64 flex items-center">
            <IoMdArrowBack className="h-7 w-7" />
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
                últ. vez hoy a las 02:10
              </p>
            </article>
          </div>
          <div className="h-full flex items-center gap-3">
            <BiVideo className="h-7 w-7" />
            <MdOutlineCall className="h-7 w-7" />
            <BsThreeDotsVertical className="h-7 w-7" />
          </div>
        </section>
      </div>
    </main>
  );
};

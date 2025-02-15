"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCall } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAttach } from "react-icons/io5";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useForm } from "react-hook-form";

interface Message {
  id: number;
  text: string;
  sender: "yo" | "contacto";
  time: string;
}

interface FormValues {
  message: string;
  sender: "yo" | "contacto";
}

export const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: { message: "", sender: "yo" },
  });

  const messageValue = watch("message", "");

  const onSubmit = (data: FormValues) => {
    if (data.message.trim() === "") return;
    const newMsg: Message = {
      id: Date.now(),
      text: data.message,
      sender: data.sender,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
    setMessages((prev) => [...prev, newMsg]);
    reset();
  };

  return (
    <>
    <main className="overflow-hidden flex justify-center flex-col items-center">
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
          <div className="h-full w-64 flex items-center gap-1">
            <IoMdArrowBack className="h-6 w-6" />
            <Image
              src="/kokushibo.jpg"
              width={400}
              height={400}
              alt="foto de perfil"
              className="h-10 w-10 rounded-full object-cover aspect-square"
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

        {/* MENSAJES: Sección intermedia */}
        <section className="absolute top-16 bottom-20 w-full overflow-y-auto p-2">
          {messages.map((msg) => {
            const isSenderMe = msg.sender === "yo";
            return (
              <div
                key={msg.id}
                className={`mb-2 flex ${
                  isSenderMe ? "justify-end" : "justify-start"
                }`}
              >
                {isSenderMe ? (
                  <>
                    <div
                      className={`px-3 py-2 rounded-xl flex rounded-tr-none max-w-[85%] bg-[#134d37] ${
                        msg.text.length > 15 ? "flex-wrap" : ""
                      }`}
                    >
                      <p className="w-full break-words">{msg.text}</p>
                      <p className="text-sm self-end pl-2 pr-1 text-[#8caa9e] ml-auto">
                        {msg.time}
                      </p>
                      <svg
                        viewBox="0 0 16 11"
                        height="11"
                        width="16"
                        preserveAspectRatio="xMidYMid meet"
                        fill="#54bce6"
                        className="self-end my-1 flex-shrink-0"
                      >
                        <title>msg-dblcheck</title>
                        <path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z"></path>
                      </svg>
                    </div>
                    <svg
                      viewBox="0 0 8 13"
                      height="13"
                      width="8"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <title>tail-out</title>
                      <path
                        opacity="0.13"
                        d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
                        fill="#134d37"
                      ></path>
                      <path
                        fill="#134d37"
                        d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
                      ></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 8 13"
                      height="13"
                      width="8"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <title>tail-in</title>
                      <path
                        opacity="0.13"
                        fill="#1f272a"
                        d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
                      ></path>
                      <path
                        fill="#1f272a"
                        d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
                      ></path>
                    </svg>
                    <div
                      className={`px-3 py-2 rounded-xl flex rounded-tl-none max-w-[85%] bg-[#1f272a] ${
                        msg.text.length > 15 ? "flex-wrap" : ""
                      }`}
                    >
                      <p className="w-full break-words">{msg.text}</p>
                      <p className="text-sm self-end pl-2 text-[#909398] ml-auto">
                        {msg.time}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </section>

        {/* ENVIAR MENSAJES: Sección inferior */}
        <section className="h-20 w-full absolute bottom-0 flex flex-col items-center gap-1 px-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex items-center gap-2"
          >
            <article className="bg-[#1f272a] h-12 flex items-center rounded-full px-3 w-full max-w-[85%] min-w-[150px]">
              <svg viewBox="0 0 24 24" height="24" width="24" fill="none">
                <path
                  d="M8.5 10.25c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM17 8.75c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"
                  fill="#8d9598"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.82 19.98c-1.28 1.27-3.01 2-4.82 2H9.27C5.26 22 2 18.74 2 14.73V9.27C2 5.26 5.26 2 9.27 2h5.46C18.74 2 22 5.26 22 9.27v2.54c0 1.94-.77 3.8-2.15 5.16l-3.02 3.01zM14.73 4H9.27C6.36 4 4 6.36 4 9.27v5.46C4 17.64 6.36 20 9.27 20h2.06c.39-.1.68-.46.67-.88l-.01-2.26c-.95 0-1.84-.23-2.66-.7-.83-.47-1.49-1.1-1.99-1.9-.1-.2-.09-.4.03-.6.12-.2.3-.3.53-.3h5.7c.86-.77 1.99-1.24 3.23-1.23h2.26c.5 0 .91-.41.91-.92V9.08h-.01C19.89 6.26 17.57 4 14.73 4zM14.01 19.11c.01.15 0 .3-.03.44.53-.24 1.02-.57 1.42-.99l3.03-3.01c.46-.45.83-.98 1.09-1.56-.15.02-.3.03-.45.03h-2.26c-1.56-.01-2.83 1.26-2.82 2.82v2.26z"
                  fill="#8d9598"
                />
              </svg>
              <input
                type="text"
                placeholder="Mensaje"
                className="flex-1 text-lg bg-transparent text-white px-2 py-2 outline-none min-w-0"
                {...register("message")}
              />
              <IoAttach className="w-6 h-6 min-w-6 mr-2 text-gray-400" />
              <MdOutlineCameraAlt className="w-6 h-6 min-w-6 text-gray-400" />
            </article>
            <button
              type="submit"
              className="bg-[#21c063] w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center"
            >
              {messageValue.trim() === "" ? (
                <svg viewBox="0 0 24 24" height="24" width="24" fill="black">
                  <path d="M12 14.942c2 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.531 3.531zM18.237 11.412c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-0.588 7.061-3.884 7.061-7.885h-1.999z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" height="24" width="24" fill="black">
                  <path d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845L1.101,21.757z"></path>
                </svg>
              )}
            </button>
          </form>

        </section>
      </div>
          <div className="w-full max-w-[85%] flex justify-center gap-4 text-black">
            <label className="flex items-center gap-1 ">
              <input
                type="radio"
                value="yo"
                {...register("sender")}
                defaultChecked
              />
              Yo
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" value="other" {...register("sender")} />
              Contacto
            </label>
          </div>
    </main>
    </>
  );
};

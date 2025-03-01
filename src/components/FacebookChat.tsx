"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IFormValues, IMessage } from "@/interfaces/types";
import { subirArchivo } from "@/api/subirArchivo";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { BiSolidCamera } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";

export const FacebookChat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { register, handleSubmit, watch, resetField, setValue } =
    useForm<IFormValues>({
      defaultValues: {
        message: "",
        sender: "yo",
        contactName: "Carlos Daniel",
        contactStatus: "Activo(a) ahora",
        contactPhoto: "/fotodeperfilig.png",
      },
      mode: "onChange",
    });

  const contactName = watch("contactName");
  const contactStatus = watch("contactStatus");
  const contactPhoto = watch("contactPhoto");
  const messageValue = watch("message", "");

  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onSubmit = (data: IFormValues) => {
    if (data.message.trim() === "") return;
    const newMsg: IMessage = {
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
    resetField("message");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadStatus("loading");
      setUploadError(null);
      await subirArchivo(file, setValue, setUploadStatus, setUploadError);
    }
  };

  const getRoundedClasses = (index: number, messages: IMessage[]): string => {
    const current = messages[index];

    if (current.sender !== "yo") return "rounded-full";

    const baseClass = current.text.length > 35 ? "rounded-2xl" : "rounded-full";
    const prev = messages[index - 1];
    const next = messages[index + 1];
    const isFirst = !prev || prev.sender !== "yo";
    const isLast = !next || next.sender !== "yo";

    if (isFirst && isLast) return baseClass;
    if (isFirst && !isLast) return `${baseClass} rounded-br-none`;
    if (!isFirst && isLast) return `${baseClass} rounded-tr-none`;
    return `${baseClass} rounded-r-none`;
  };

  const getRoundedClassesContact = (
    index: number,
    messages: IMessage[]
  ): string => {
    const current = messages[index];

    if (current.sender !== "contacto") return "rounded-full";

    const baseClass = current.text.length > 35 ? "rounded-2xl" : "rounded-full";
    const prev = messages[index - 1];
    const next = messages[index + 1];
    const isFirst = !prev || prev.sender !== "contacto";
    const isLast = !next || next.sender !== "contacto";

    if (isFirst && isLast) return baseClass;
    if (isFirst && !isLast) return `${baseClass} rounded-bl-none`;
    if (!isFirst && isLast) return `${baseClass} rounded-tl-none`;
    return `${baseClass} rounded-l-none`;
  };

  return (
    <>
      <main className="overflow-hidden flex flex-col justify-center items-center gap-6 min-[808px]:flex-row min-[808px]:gap-12 min-[808px]:px-4">
        <div className="w-full h-full max-w-[440px] relative min-w-screen min-h-screen border border-[#363636]">
          {/* ChatContacto */}
          <section className="h-16 w-full flex justify-between items-center">
            <div className="h-full w-64 flex items-center gap-1">
              <IoMdArrowBack className="h-7 w-7 mx-1 text-[#126cfe]" />
              <div className="relative w-10 h-10">
                <Image
                  src={contactPhoto}
                  width={400}
                  height={400}
                  alt="foto de perfil"
                  className="h-10 w-10 rounded-full object-cover aspect-square"
                />
                {contactStatus &&
                  (contactStatus === "Activo(a) ahora" ||
                    contactStatus === "Active now" ||
                    contactStatus === "Online") && (
                    <span className="h-3 w-3 border border-black bg-[#1cd14f] rounded-full absolute bottom-0 right-0"></span>
                  )}
              </div>

              <article className="px-2 overflow-hidden max-[290px]:w-20">
                <h2 className="font-bold text-lg overflow-hidden text-nowrap text-ellipsis">
                  {contactName}
                </h2>
                <p className="text-sm text-[#a4acb5] overflow-hidden text-nowrap text-ellipsis">
                  {contactStatus}
                </p>
              </article>
            </div>
            <div className="h-full flex items-center gap-6 mr-3">
              <IoCall className="w-6 h-6 text-[#126cfe]" />
              <FaVideo className="w-6 h-6 text-[#126cfe]" />
              <svg
                height="24px"
                name="icon"
                role="presentation"
                viewBox="0 0 36 36"
                width="24px"
              >
                <g transform="translate(18,18)scale(1.2)translate(-18,-18)">
                  <path
                    d="M18,10 C16.6195,10 15.5,11.119 15.5,12.5 C15.5,13.881 16.6195,15 18,15 C19.381,15 20.5,13.881 20.5,12.5 C20.5,11.119 19.381,10 18,10 Z M16,25 C16,25.552 16.448,26 17,26 L19,26 C19.552,26 20,25.552 20,25 L20,18 C20,17.448 19.552,17 19,17 L17,17 C16.448,17 16,17.448 16,18 L16,25 Z M18,30 C11.3725,30 6,24.6275 6,18 C6,11.3725 11.3725,6 18,6 C24.6275,6 30,11.3725 30,18 C30,24.6275 24.6275,30 18,30 Z"
                    fill="#126cfe"
                    stroke="#126cfe"
                  ></path>
                </g>
              </svg>
            </div>
          </section>

          {/* ChatMensajes */}
          <section className="absolute top-16 bottom-16 w-full overflow-y-auto px-2">
            {messages.map((msg, index) => {
              const isSenderMe = msg.sender === "yo";
              const prevMsg = messages[index - 1];
              const marginClass =
                prevMsg && prevMsg.sender === msg.sender ? "mt-0.5" : "mt-2";

              if (isSenderMe) {
                return (
                  <div
                    key={msg.id}
                    className={`flex justify-end ${marginClass}`}
                  >
                    <div
                      className={`px-3 py-2 flex max-w-[80%] bg-[#5653f8] ${getRoundedClasses(
                        index,
                        messages
                      )}`}
                    >
                      <p className="w-full break-words">{msg.text}</p>
                    </div>
                  </div>
                );
              } else {
                const roundedClasses = getRoundedClassesContact(
                  index,
                  messages
                );
                const isLastContact =
                  !messages[index + 1] ||
                  messages[index + 1].sender !== "contacto";
                return (
                  <div
                    key={msg.id}
                    className={`flex justify-start items-end ${marginClass}`}
                  >
                    <div className="w-8 h-8 mr-2">
                      {isLastContact ? (
                        <Image
                          src={contactPhoto}
                          width={400}
                          height={400}
                          alt="foto de perfil"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8" />
                      )}
                    </div>
                    <div
                      className={`px-3 py-2 flex max-w-[85%] bg-[#1f272a] ${roundedClasses}`}
                    >
                      <p className="w-full break-words">{msg.text}</p>
                    </div>
                  </div>
                );
              }
            })}
          </section>

          {/* ChatForm */}
          <section className="h-16 w-full absolute bottom-0 flex flex-col items-center justify-center gap-1 px-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex items-center gap-2"
            >
              <article className="bg-[#262626] h-14 flex items-center rounded-full px-2 w-full min-w-[150px]">
                <p className="bg-[#d101c6] rounded-full h-10 w-10 flex items-center justify-center aspect-square">
                  <BiSolidCamera className="h-6 w-6" />
                </p>

                <input
                  type="text"
                  placeholder="Enviar mensaje..."
                  className="flex-1 text-lg bg-transparent text-white px-2 py-2 outline-none min-w-0"
                  {...register("message")}
                />

                <button
                  type="submit"
                  className="w-fit h-12 rounded-full flex items-center justify-center"
                >
                  {messageValue.trim() === "" ? (
                    <div className="flex items-center gap-3 mr-2">
                      <svg
                        aria-label="Clip de voz"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path
                          d="M19.5 10.671v.897a7.5 7.5 0 0 1-15 0v-.897"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="12"
                          x2="12"
                          y1="19.068"
                          y2="22"
                        ></line>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="8.706"
                          x2="15.104"
                          y1="22"
                          y2="22"
                        ></line>
                        <path
                          d="M12 15.745a4 4 0 0 1-4-4V6a4 4 0 0 1 8 0v5.745a4 4 0 0 1-4 4Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                      <svg
                        aria-label="Añadir foto o vídeo"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path
                          d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z"
                          fillRule="evenodd"
                        ></path>
                        <path
                          d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905"
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                        <path
                          d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                      <svg
                        aria-label="Choose a GIF or sticker"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path
                          d="M13.11 22H7.416A5.417 5.417 0 0 1 2 16.583V7.417A5.417 5.417 0 0 1 7.417 2h9.166A5.417 5.417 0 0 1 22 7.417v5.836a2.083 2.083 0 0 1-.626 1.488l-6.808 6.664A2.083 2.083 0 0 1 13.11 22Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                        <circle cx="8.238" cy="9.943" r="1.335"></circle>
                        <circle cx="15.762" cy="9.943" r="1.335"></circle>
                        <path
                          d="M15.174 15.23a4.887 4.887 0 0 1-6.937-.301"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                        <path
                          d="M22 10.833v1.629a1.25 1.25 0 0 1-1.25 1.25h-1.79a5.417 5.417 0 0 0-5.417 5.417v1.62a1.25 1.25 0 0 1-1.25 1.25H9.897"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                      </svg>
                      <FiPlusCircle className="h-6 w-6" />
                    </div>
                  ) : (
                    <div className="bg-[#7838f6] h-10 w-10 flex items-center justify-center rounded-full">
                      <IoIosSend className="h-6 w-6" />
                    </div>
                  )}
                </button>
              </article>
            </form>
          </section>
        </div>

        {/* ChatSettings */}
        <div className="border border-gray-800 rounded-sm p-6 h-full w-full max-w-[440px]">
          <h3 className="text-xl text-center font-bold mb-4">
            Configuración del chat
          </h3>
          <p>Elige quién envía el mensaje</p>
          <section className="flex gap-4 mb-4 mt-1">
            <label
              className={`h-12 border-2 w-full rounded-md flex items-center gap-1 px-2 cursor-pointer ${
                watch("sender") === "yo"
                  ? "border-blue-500 border-4"
                  : "border-[#555555]"
              }`}
            >
              <input
                type="radio"
                value="yo"
                {...register("sender")}
                defaultChecked
                className="cursor-pointer"
              />
              Yo
            </label>
            <label
              className={`h-12 border-2 rounded-md flex items-center gap-1 px-2 w-full cursor-pointer ${
                watch("sender") === "contacto"
                  ? "border-blue-500 border-4"
                  : "border-[#555555]"
              }`}
            >
              <input
                type="radio"
                value="contacto"
                {...register("sender")}
                className="cursor-pointer"
              />
              Contacto
            </label>
          </section>

          <section className="flex flex-col gap-4">
            <article>
              <label>Nombre del contacto</label>
              <input
                type="text"
                className="w-full h-12 p-2 rounded-md border-2 my-1 border-[#555555] bg-[#121212]"
                placeholder="Nombre del contacto"
                maxLength={15}
                {...register("contactName", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 1,
                    message: "1 carácter mínimo",
                  },
                  maxLength: {
                    value: 15,
                    message: "15 caracteres máximo",
                  },
                })}
              />
              <div className="text-sm flex gap-5">
                <p
                  className={
                    contactName?.length >= 1 ? "text-green-500" : "text-red-500"
                  }
                >
                  <span className="flex items-center gap-1">
                    <FaCircleCheck />1 carácter mínimo
                  </span>
                </p>
                <p
                  className={
                    contactName?.length <= 15 && contactName?.length != 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  <span className="flex items-center gap-1">
                    <FaCircleCheck />
                    15 caracteres máximo
                  </span>
                </p>
              </div>
            </article>
            <article>
              <label>Estado de conexión</label>
              <input
                type="text"
                className="w-full h-12 p-2 rounded-md border-2 border-[#555555] my-1 bg-[#121212]"
                placeholder="Ej: Activo(a) ahora | Activo(a) hace 20 min"
                maxLength={25}
                {...register("contactStatus", {
                  maxLength: {
                    value: 25,
                    message: "25 caracteres máximo ",
                  },
                })}
              />
              <div className="text-sm">
                {contactStatus?.length <= 25 && contactStatus?.length > 0 ? (
                  <p className="text-green-500">
                    <span className="flex items-center gap-1">
                      <FaCircleCheck />
                      25 caracteres máximo
                    </span>
                  </p>
                ) : (
                  <p className="text-green-500">
                    <span className="flex items-center gap-1">
                      <FaCircleCheck />
                      Ocultar conexión
                    </span>
                  </p>
                )}
              </div>
            </article>
            <article>
              <label>Foto de perfil</label>
              <div className="flex items-center flex-col">
                <label
                  className={`cursor-pointer w-full h-12 text-lg flex justify-center items-center font-bold my-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${
                    uploadStatus === "loading"
                      ? "bg-gray-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {uploadStatus === "loading" ? (
                    <span>Subiendo...</span>
                  ) : (
                    <span>Subir foto</span>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploadStatus === "loading"}
                  />
                </label>
                {uploadStatus === "success" && (
                  <div className="text-sm self-start">
                    <p
                      className={
                        contactStatus?.length <= 25
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      <span className="flex items-center gap-1">
                        <FaCircleCheck />
                        Actualizada
                      </span>
                    </p>
                  </div>
                )}
                {uploadStatus === "error" && uploadError && (
                  <div className="text-sm self-start">
                    <p
                      className={
                        contactStatus?.length <= 25
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      <span className="flex items-center gap-1">
                        <FaCircleCheck />
                        Error
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
};

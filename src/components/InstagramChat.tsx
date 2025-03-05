"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IFormValues, IMessage } from "@/interfaces/types";
import { subirArchivo } from "@/api/subirArchivo";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BiSolidCamera } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { SplitText } from "./animations/SplitText";
import { Cards } from "./Cards";
import { StarBorder } from "./animations/StarBorder";
import { useDownloadChat } from "@/hooks/useDownloadChat";

export const InstagramChat: React.FC = () => {
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

    let isFoto = false;

    if (data.message === "!foto") {
      data.message = "Foto";
      isFoto = true;
    }

    const newMsg: IMessage = {
      id: Date.now(),
      text: data.message,
      sender: data.sender,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      isFoto,
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

  const { chatRef, handleDownload } = useDownloadChat();

  return (
    <>
      <h2 className="flex flex-col justify-center items-center truncate my-6 sm:mt-12 sm:mb-10">
        <SplitText
          text="Crea un chat ficticio de Instagram"
          className="text-xl font-semibold text-center w-[95%] sm:text-2xl sm:w-[90%] md:text-4xl md:w-[85%] lg:text-5xl lg:w-[85%] xl:w-[75%] 2xl:w-[65%]"
          delay={20}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />
      </h2>
      <main className="overflow-hidden flex flex-col justify-center items-center gap-6 min-[808px]:flex-row min-[808px]:gap-12 min-[808px]:px-4">
        <div
          className="w-full h-full max-w-[440px] relative min-w-screen min-h-screen bg-black sm:shadow-xl sm:shadow-blue-500"
          ref={chatRef}
        >
          {/* ChatContacto */}
          <section className="h-16 w-full flex justify-between items-center">
            <div className="h-full w-64 flex items-center gap-1">
              <IoIosArrowRoundBack className="w-10 h-10" />
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
                <h2 className="font-bold overflow-hidden text-nowrap text-ellipsis flex items-center">
                  {contactName}
                  <IoIosArrowForward className="text-[#a4acb5] text-sm ml-1" />
                </h2>
                <p className="text-sm text-[#a4acb5] overflow-hidden text- text-nowrap text-ellipsis">
                  {contactStatus}
                </p>
              </article>
            </div>
            <div className="h-full flex items-center gap-6 mr-4">
              <svg
                aria-label="Llamada de audio"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path>
              </svg>
              <svg
                aria-label="Videollamada"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <rect
                  fill="none"
                  height="18"
                  rx="3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  width="16.999"
                  x="1"
                  y="3"
                ></rect>
                <path
                  d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
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
                      <p
                        className={`w-full break-words ${
                          msg.isFoto &&
                          "text-[#cec9ff] flex items-center gap-1.5"
                        }`}
                      >
                        {msg.isFoto && (
                          <svg
                            fill="currentColor"
                            height="16"
                            role="img"
                            viewBox="0 0 24 24"
                            width="16"
                          >
                            <polygon points="13.25 17 13.25 7 10.919 7 8.199 8.96 8.199 11.414 10.75 9.717 10.75 17 13.25 17"></polygon>
                            <path d="M2.97 12.137a1.5 1.5 0 0 0-1.5-1.482h-.02a1.5 1.5 0 0 0-1.48 1.519 11.96 11.96 0 0 0 .914 4.45 1.5 1.5 0 0 0 2.771-1.15 8.955 8.955 0 0 1-.685-3.337Zm8.02-9.064a9.066 9.066 0 0 1 3.4.279 1.5 1.5 0 0 0 .803-2.89A12.081 12.081 0 0 0 10.665.09a1.5 1.5 0 0 0-1.33 1.653 1.492 1.492 0 0 0 1.654 1.33Zm7.836 3.115a11.434 11.434 0 0 1 1.375 2.252 1.499 1.499 0 1 0 2.73-1.242 14.533 14.533 0 0 0-1.769-2.891c-.249-.297-.51-.58-.78-.845A1.5 1.5 0 0 0 18.278 5.6c.202.199.399.41.548.587ZM6.188 5.122c.194-.163.394-.317.598-.46A1.5 1.5 0 0 0 5.06 2.207a11.964 11.964 0 0 0-3.67 4.144A1.498 1.498 0 0 0 2.708 8.56c.534 0 1.052-.287 1.322-.791a8.987 8.987 0 0 1 2.157-2.648ZM9.4 20.682c-1.056-.335-2.069-.886-3.008-1.64a1.5 1.5 0 1 0-1.877 2.34c1.23.986 2.569 1.713 3.98 2.159a1.5 1.5 0 0 0 .904-2.86Zm13.213-9.196c-.811-.089-1.554.53-1.63 1.356A8.502 8.502 0 0 1 20 16.075a1.499 1.499 0 1 0 2.646 1.412 11.48 11.48 0 0 0 1.322-4.37 1.499 1.499 0 0 0-1.356-1.63Zm-5.649 7.96a9.284 9.284 0 0 1-3.129 1.394 1.5 1.5 0 1 0 .686 2.92 12.256 12.256 0 0 0 4.14-1.84 1.5 1.5 0 0 0-1.697-2.474Z"></path>
                          </svg>
                        )}
                        {msg.text}
                      </p>
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
                      <p
                        className={`w-full break-words ${
                          msg.isFoto &&
                          "text-[#989898] flex items-center gap-1.5"
                        }`}
                      >
                        {msg.isFoto && (
                          <svg
                            fill="currentColor"
                            height="16"
                            role="img"
                            viewBox="0 0 24 24"
                            width="16"
                          >
                            <polygon points="13.25 17 13.25 7 10.919 7 8.199 8.96 8.199 11.414 10.75 9.717 10.75 17 13.25 17"></polygon>
                            <path d="M2.97 12.137a1.5 1.5 0 0 0-1.5-1.482h-.02a1.5 1.5 0 0 0-1.48 1.519 11.96 11.96 0 0 0 .914 4.45 1.5 1.5 0 0 0 2.771-1.15 8.955 8.955 0 0 1-.685-3.337Zm8.02-9.064a9.066 9.066 0 0 1 3.4.279 1.5 1.5 0 0 0 .803-2.89A12.081 12.081 0 0 0 10.665.09a1.5 1.5 0 0 0-1.33 1.653 1.492 1.492 0 0 0 1.654 1.33Zm7.836 3.115a11.434 11.434 0 0 1 1.375 2.252 1.499 1.499 0 1 0 2.73-1.242 14.533 14.533 0 0 0-1.769-2.891c-.249-.297-.51-.58-.78-.845A1.5 1.5 0 0 0 18.278 5.6c.202.199.399.41.548.587ZM6.188 5.122c.194-.163.394-.317.598-.46A1.5 1.5 0 0 0 5.06 2.207a11.964 11.964 0 0 0-3.67 4.144A1.498 1.498 0 0 0 2.708 8.56c.534 0 1.052-.287 1.322-.791a8.987 8.987 0 0 1 2.157-2.648ZM9.4 20.682c-1.056-.335-2.069-.886-3.008-1.64a1.5 1.5 0 1 0-1.877 2.34c1.23.986 2.569 1.713 3.98 2.159a1.5 1.5 0 0 0 .904-2.86Zm13.213-9.196c-.811-.089-1.554.53-1.63 1.356A8.502 8.502 0 0 1 20 16.075a1.499 1.499 0 1 0 2.646 1.412 11.48 11.48 0 0 0 1.322-4.37 1.499 1.499 0 0 0-1.356-1.63Zm-5.649 7.96a9.284 9.284 0 0 1-3.129 1.394 1.5 1.5 0 1 0 .686 2.92 12.256 12.256 0 0 0 4.14-1.84 1.5 1.5 0 0 0-1.697-2.474Z"></path>
                          </svg>
                        )}
                        {msg.text}
                      </p>
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
        <div className="flex flex-col gap-6 justify-center items-center">
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
                      contactName?.length >= 1
                        ? "text-green-500"
                        : "text-red-500"
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
          <StarBorder
            as="button"
            className="custom-class sm:w-96 font-bold"
            color="#ff00c9"
            speed="6s"
            onClick={handleDownload}
          >
            Captura de pantalla
          </StarBorder>
        </div>
      </main>
      <section>
        <h2 className="flex flex-col justify-center items-center truncate mt-16 mb-6">
          <SplitText
            text="Elige tu chat personalizado:"
            className="text-xl font-semibold text-center w-[95%] sm:text-2xl sm:w-[90%] md:text-3xl md:w-[85%] lg:text-4xl lg:w-[85%] xl:w-[75%] 2xl:w-[65%]"
            delay={20}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </h2>
        <Cards />
      </section>
    </>
  );
};

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IFormValues, IMessage } from "@/interfaces/types";
import { subirArchivo } from "@/api/subirArchivo";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa6";
import { SplitText } from "./animations/SplitText";
import { Cards } from "./Cards";
import { useDownloadChat } from "@/hooks/useDownloadChat";
import { StarBorder } from "./animations/StarBorder";
import notificacion from "./Notificacion";
import { IoIosArrowForward } from "react-icons/io";
import { FaPlay } from "react-icons/fa";

export const FacebookChat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const { register, handleSubmit, watch, resetField, setValue } =
    useForm<IFormValues>({
      defaultValues: {
        message: "",
        sender: "yo",
        contactName: "Carlos",
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
    let text = data.message;
    let isDeleted = false;

    if (data.sender === "yo") {
      if (data.message === "!fotovista" || data.message === "!foto") {
        text = "Foto";
        isFoto = true;
      } else if (data.message === "!videovisto" || data.message === "!video") {
        text = "Video";
        isFoto = true;
      } else if (data.message === "!eliminar") {
        text = "Eliminaste un mensaje";
        isDeleted = true;
      }
    } else if (data.sender === "contacto") {
      if (data.message === "!foto") {
        text = "Ver foto";
        isFoto = true;
      } else if (data.message === "!video") {
        text = "Ver video";
        isFoto = true;
      } else if (data.message === "!fotovista") {
        text = "Foto";
        isFoto = true;
      } else if (data.message === "!videovisto") {
        text = "Video";
        isFoto = true;
      } else if (data.message === "!eliminar") {
        text = `${data.contactName} eliminó un mensaje`;
        isDeleted = true;
      }
    }

    const newMsg: IMessage = {
      id: Date.now(),
      text: text,
      sender: data.sender,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      isFoto,
      isDeleted,
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
  const handleScreenshot = async () => {
    setIsCapturing(true);
    await handleDownload();
    setIsCapturing(false);
  };

  return (
    <>
      <main className="overflow-hidden flex flex-col justify-center items-center gap-6 min-[808px]:flex-row min-[808px]:gap-12 min-[808px]:px-4">
        <div
          className="w-full h-full max-w-[440px] relative min-w-screen min-h-screen bg-black sm:shadow-xl sm:shadow-blue-500"
          ref={chatRef}
        >
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
                    <span className="h-3 w-3 border border-black bg-[#31a63b] rounded-full absolute bottom-0 right-0"></span>
                  )}
              </div>

              <article className="px-2 overflow-hidden max-[290px]:w-20">
                <h2 className="font-bold overflow-hidden text-nowrap text-ellipsis">
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
          <section className="absolute top-16 bottom-16 w-full overflow-y-auto px-2 scrollbar-hide">
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
                      className={`px-3 py-2 flex max-w-[80%] ${msg.isDeleted ? 'border border-[#212121] text-[#b0b3b9]' : 'bg-[#4c71fe]'} ${getRoundedClasses(
                        index,
                        messages
                      )}`}
                    >
                      <p
                        className={`w-full break-words ${msg.isFoto &&
                          "text-[#f9fdff] flex items-center gap-1.5"
                          }`}
                      >
                        {msg.isFoto && (
                          <svg
                            viewBox="6 6 24 24"
                            fill="currentColor"
                            width="20"
                            height="20"
                            aria-hidden="true"
                          >
                            <path d="M7 18c0-6.075 4.925-11 11-11a1.25 1.25 0 1 1 0 2.5 8.5 8.5 0 0 0 0 17 1.25 1.25 0 1 1 0 2.5c-6.075 0-11-4.925-11-11zM22.25 10.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM27.5 12.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM27.75 19.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM27.5 23.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM22.25 28a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"></path>
                            <path d="M19.448 13.134c.34.19.552.548.552.937v7.858a1.071 1.071 0 0 1-2.143 0v-5.667a.143.143 0 0 0-.218-.12l-1 .624a1.071 1.071 0 1 1-1.135-1.817l2.857-1.786c.33-.207.746-.218 1.087-.029z"></path>
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
                      className={`px-3 py-2 flex max-w-[85%] ${msg.isDeleted ? 'border border-[#212121] text-[#b0b3b9]' : 'bg-[#333333]'} ${roundedClasses}`}
                    >
                      <p
                        className={`w-full break-words ${msg.isFoto &&
                          "text-[#f9f9f9] flex items-center gap-1.5"
                          } ${msg.text === "Ver foto" || msg.text === "Ver video" ? "font-bold" : ""}`}
                      >
                        {msg.isFoto && (msg.text === "Ver foto" || msg.text === "Ver video" ? (
                          <FaPlay className="text-[#5647ea] w-3 h-3" />
                        ) : (
                          <svg
                            viewBox="6 6 24 24"
                            fill="currentColor"
                            width="20"
                            height="20"
                            aria-hidden="true"
                          >
                            <path d="M7 18c0-6.075 4.925-11 11-11a1.25 1.25 0 1 1 0 2.5 8.5 8.5 0 0 0 0 17 1.25 1.25 0 1 1 0 2.5c-6.075 0-11-4.925-11-11zM22.25 10.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM27.5 12.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM27.75 19.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM27.5 23.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM22.25 28a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"></path>
                            <path d="M19.448 13.134c.34.19.552.548.552.937v7.858a1.071 1.071 0 0 1-2.143 0v-5.667a.143.143 0 0 0-.218-.12l-1 .624a1.071 1.071 0 1 1-1.135-1.817l2.857-1.786c.33-.207.746-.218 1.087-.029z"></path>
                          </svg>
                        ))}
                        {msg.text}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </section>

          {/* ChatForm */}
          <section className="h-16 w-full absolute bottom-0 flex flex-col items-center justify-center gap-1 px-2 cursor-pointer">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex items-center gap-2"
            >
              {messageValue.trim() === "" ? (
                <article className="flex h-12 items-center justify-center gap-4">
                  <svg
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    onClick={() =>
                      notificacion(
                        "Escribe !foto para enviar una foto solo para verse una vez."
                      )
                    }
                  >
                    <path
                      d="m18,11l-5,0l0,-5c0,-0.552 -0.448,-1 -1,-1c-0.5525,0 -1,0.448 -1,1l0,5l-5,0c-0.5525,0 -1,0.448 -1,1c0,0.552 0.4475,1 1,1l5,0l0,5c0,0.552 0.4475,1 1,1c0.552,0 1,-0.448 1,-1l0,-5l5,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1m-6,13c-6.6275,0 -12,-5.3725 -12,-12c0,-6.6275 5.3725,-12 12,-12c6.627,0 12,5.3725 12,12c0,6.6275 -5.373,12 -12,12"
                      fill="#5271ff"
                    ></path>
                  </svg>
                  <FaCamera
                    className="hidden min-[368px]:block h-6 w-6 text-[#5271ff]"
                    onClick={() =>
                      notificacion(
                        "Escribe !foto para enviar una foto solo para verse una vez."
                      )
                    }
                  />
                  <FaRegImage
                    className="hidden min-[368px]:block h-6 w-6 text-[#5271ff]"
                    onClick={() =>
                      notificacion(
                        "Escribe !foto para enviar una foto solo para verse una vez."
                      )
                    }
                  />
                  <FaMicrophone
                    className="hidden min-[368px]:block h-6 w-6 text-[#5271ff]"
                    onClick={() =>
                      notificacion(
                        "Funcionalidad en desarrollo. Escribe texto."
                      )
                    }
                  />
                </article>
              ) : (
                <IoIosArrowForward
                  className="w-7 h-7 text-[#5271ff]"
                  onClick={() =>
                    notificacion(
                      "Escribe !foto para enviar una foto solo para verse una vez."
                    )
                  }
                />
              )}
              <article className="bg-[#1f272a] h-12 flex items-center rounded-full px-3 w-full max-w-[85%] min-w-[150px]">
                <input
                  type="text"
                  placeholder="Mensaje"
                  className="flex-1 text-lg bg-transparent text-white px-2 py-2 outline-none min-w-0"
                  {...register("message")}
                />
                <svg
                  height="24px"
                  viewBox="0 0 38 38"
                  width="24px"
                  onClick={() =>
                    notificacion("Usa los emojis del teclado de tu celular.")
                  }
                >
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(-893.000000, -701.000000)">
                      <g transform="translate(709.000000, 314.000000)">
                        <g>
                          <path
                            d="M210.5,405 C209.121,405 208,403.879 208,402.5 C208,401.121 209.121,400 210.5,400 C211.879,400 213,401.121 213,402.5 C213,403.879 211.879,405 210.5,405 M212.572,411.549 C210.428,413.742 206.938,415 203,415 C199.062,415 195.572,413.742 193.428,411.549 C192.849,410.956 192.859,410.007 193.451,409.428 C194.045,408.85 194.993,408.859 195.572,409.451 C197.133,411.047 199.909,412 203,412 C206.091,412 208.867,411.047 210.428,409.451 C211.007,408.859 211.956,408.85 212.549,409.428 C213.141,410.007 213.151,410.956 212.572,411.549 M195.5,400 C196.879,400 198,401.121 198,402.5 C198,403.879 196.879,405 195.5,405 C194.121,405 193,403.879 193,402.5 C193,401.121 194.121,400 195.5,400 M203,387 C192.523,387 184,395.523 184,406 C184,416.477 192.523,425 203,425 C213.477,425 222,416.477 222,406 C222,395.523 213.477,387 203,387"
                            fill="#5271ff"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </article>
              <button
                type="submit"
                className="flex items-center justify-center ml-1"
              >
                {messageValue.trim() === "" ? (
                  <svg
                    aria-hidden="true"
                    height="24"
                    viewBox="0 0 16 16"
                    width="24"
                    onClick={() =>
                      notificacion("Usa los emojis del teclado de tu celular.")
                    }
                  >
                    <path
                      d="M16,9.1c0-0.8-0.3-1.1-0.6-1.3c0.2-0.3,0.3-0.7,0.3-1.2c0-1-0.8-1.7-2.1-1.7h-3.1c0.1-0.5,0.2-1.3,0.2-1.8 c0-1.1-0.3-2.4-1.2-3C9.3,0.1,9,0,8.7,0C8.1,0,7.7,0.2,7.6,0.4C7.5,0.5,7.5,0.6,7.5,0.7L7.6,3c0,0.2,0,0.4-0.1,0.5L5.7,6.6c0,0-0.1,0.1-0.1,0.1l0,0l0,0L5.3,6.8C5.1,7,5,7.2,5,7.4v6.1c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,1,1,2,1h5.2c0.9,0,1.4-0.3,1.8-0.9c0.3-0.5,0.2-1,0.1-1.4c0.5-0.2,0.9-0.5,1.1-1.2c0.1-0.4,0-0.8-0.2-1C15.6,10.3,16,9.9,16,9.1z"
                      fill="#5271ff"
                    ></path>
                    <path
                      d="M3.3,6H0.7C0.3,6,0,6.3,0,6.7v8.5C0,15.7,0.3,16,0.7,16h2.5C3.7,16,4,15.7,4,15.3V6.7C4,6.3,3.7,6,3.3,6z"
                      fill="#5271ff"
                    ></path>
                  </svg>
                ) : (
                  <svg height="24px" viewBox="0 0 24 24" width="24px">
                    <path
                      d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
                      fill="#5271ff"
                    ></path>
                  </svg>
                )}
              </button>
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
                className={`h-12 border-2 w-full rounded-md flex items-center gap-1 px-2 cursor-pointer ${watch("sender") === "yo"
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
                className={`h-12 border-2 rounded-md flex items-center gap-1 px-2 w-full cursor-pointer ${watch("sender") === "contacto"
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
                    className={`cursor-pointer w-full h-12 text-lg flex justify-center items-center font-bold my-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 ${uploadStatus === "loading"
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
            onClick={handleScreenshot}
            disabled={isCapturing}
          >
            {isCapturing ? "Cargando..." : "Captura de pantalla"}
          </StarBorder>
        </div>
      </main>
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold mb-6">Comandos de Facebook Messenger</h2>
        <div className="text-center flex flex-col gap-2 px-2 sm:px-0">
          <p>
            <span className="font-bold">!foto</span> - Envia una foto para verse una sola vez.
          </p>
          <p>
            <span className="font-bold">!video</span> - Envia un video para verse una sola vez.
          </p>
          <p>
            <span className="font-bold">!fotovista</span> - Envia una foto para verse una sola vez ya vista.
          </p>
          <p>
            <span className="font-bold">!videovisto</span> - Envia un video para verse una sola vez ya visto.
          </p>
          <p>
            <span className="font-bold">!eliminar</span> - Envia un mensaje eliminado.
          </p>
        </div>
      </section>
      <section id="cards-section">
        <h2 className="flex flex-col justify-center items-center truncate mt-16 mb-6">
          <SplitText
            text="Elige el chat que quieres crear:"
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

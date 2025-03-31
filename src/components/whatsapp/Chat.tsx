"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IFormValues, IMessage } from "@/interfaces/types";
import { ChatContacto } from "./ChatContacto";
import { ChatMensajes } from "./ChatMensajes";
import { ChatForm } from "./ChatForm";
import { ChatSettings } from "./ChatSettings";
import { subirArchivo } from "@/api/subirArchivo";
import { StarBorder } from "../animations/StarBorder";
import { useDownloadChat } from "@/hooks/useDownloadChat";
import { SplitText } from "../animations/SplitText";
import { Cards } from "../Cards";

export const WhatsAppChat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const { register, handleSubmit, watch, resetField, setValue } =
    useForm<IFormValues>({
      defaultValues: {
        message: "",
        sender: "yo",
        contactName: "Carlos",
        contactStatus: "En línea",
        contactPhoto: "/fotodeperfil.png",
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

  const { chatRef, handleDownload } = useDownloadChat();
  const handleScreenshot = async () => {
    setIsCapturing(true);
    await handleDownload();
    setIsCapturing(false);
  };

  const onSubmit = (data: IFormValues) => {
    if (data.message.trim() === "") return;

    let isFoto = false;
    let isVideo = false;
    let isSpecial = false;
    let isDeleted = false;

    if (data.message === "!fotovista" || data.message === "!videovisto") {
      data.message = "Abierto";
      isFoto = true;
    } else if (data.message === "!foto") {
      data.message = "Foto";
      isFoto = true;
      isSpecial = true;
    } else if (data.message === "!video") {
      data.message = "Video";
      isVideo = true;
      isSpecial = true;
    } else if (data.message === "!eliminar") {
      data.message = data.sender === "yo" ? "Eliminaste este mensaje." : "Se eliminó este mensaje.";
      isDeleted = true;
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
      isVideo,
      isSpecial,
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

  return (
    <>
      <h2 className="flex flex-col justify-center items-center truncate my-6 sm:mt-12 sm:mb-10">
        <SplitText
          text="Crea un chat ficticio de WhatsApp"
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
          ref={chatRef}
          className="w-full h-full max-w-[440px] relative min-w-screen min-h-screen bg-[url(/fondochat.png)] bg-contain bg-center sm:shadow-xl sm:shadow-blue-500"
        >
          <ChatContacto
            contactPhoto={contactPhoto}
            contactName={contactName}
            contactStatus={contactStatus}
          />

          <ChatMensajes messages={messages} />

          <ChatForm
            messageValue={messageValue}
            onSubmit={() => handleSubmit(onSubmit)()}
            handleSubmit={handleSubmit}
            register={register}
          />
        </div>

        <div className="flex flex-col gap-6 justify-center items-center">
          <ChatSettings
            contactName={contactName}
            contactStatus={contactStatus}
            handleFileChange={handleFileChange}
            uploadStatus={uploadStatus}
            uploadError={uploadError}
            watch={watch}
            register={register}
          />
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
        <h2 className="text-center text-2xl font-bold mb-6">Comandos de WhatsApp</h2>
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

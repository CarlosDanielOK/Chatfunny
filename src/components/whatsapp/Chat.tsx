"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { IFormValues, IMessage } from "@/interfaces/types";
import { ChatContacto } from "./ChatContacto";
import { ChatMensajes } from "./ChatMensajes";
import { ChatForm } from "./ChatForm";
import { ChatSettings } from "./ChatSettings";
import { subirArchivo } from "@/api/subirArchivo";
import { SplitText } from "../animations/SplitText";
import { toPng } from "html-to-image";
import { StarBorder } from "../animations/StarBorder";

export const WhatsAppChat: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { register, handleSubmit, watch, resetField, setValue } =
    useForm<IFormValues>({
      defaultValues: {
        message: "",
        sender: "yo",
        contactName: "Carlos Daniel",
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

  const chatRef = useRef<HTMLDivElement>(null);

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

  const handleDownload = async () => {
    if (chatRef.current) {
      const dataUrl = await toPng(chatRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "chat.png";
      link.click();
    }
  };

  return (
    <>
      <main className="overflow-hidden flex flex-col justify-center items-center gap-6 min-[808px]:flex-row min-[808px]:gap-12 min-[808px]:px-4">
        <div
          ref={chatRef}
          className="w-full h-full max-w-[440px] relative min-w-screen min-h-screen bg-[url(/fondochat.png)] bg-contain bg-center"
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
            className="custom-class"
            color="rgb(230, 0, 35)"
            speed="6s"
            onClick={handleDownload}
          >
            Captura de pantalla
          </StarBorder>
        </div>
      </main>
    </>
  );
};

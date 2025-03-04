import { useRef } from "react";
import { toPng } from "html-to-image";

export const useDownloadChat = () => {
  const chatRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (chatRef.current) {
      const dataUrl = await toPng(chatRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "chat.png";
      link.click();
    }
  };

  return { chatRef, handleDownload };
};

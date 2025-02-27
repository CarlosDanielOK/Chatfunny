import { IFormValues } from "@/interfaces/types";
import { UseFormSetValue } from "react-hook-form";

export const subirArchivo = async (
  file: File,
  setValue: UseFormSetValue<IFormValues>,
  setUploadStatus: (status: "idle" | "loading" | "success" | "error") => void,
  setUploadError: (error: string | null) => void
) => {
  const unsignedUploadPreset = "carloschat";
  const cloudName = "ddjfjdyii";
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", unsignedUploadPreset);

  try {
    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (data.secure_url) {
      setValue("contactPhoto", data.secure_url, { shouldValidate: true });
      setUploadStatus("success");
    } else {
      setUploadStatus("error");
      setUploadError("No se obtuvo URL de la imagen.");
    }
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    setUploadStatus("error");
    setUploadError(String(error));
  }
};

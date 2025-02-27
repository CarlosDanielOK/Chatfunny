import { IChatSettingsProps } from "@/interfaces/types";
import { FaCircleCheck } from "react-icons/fa6";

export const ChatSettings: React.FC<IChatSettingsProps> = ({
  contactName,
  contactStatus,
  handleFileChange,
  uploadStatus,
  uploadError,
  watch,
  register,
}) => {
  return (
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
            placeholder="Ej: En línea | últ. vez hoy a las 01:01"
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
  );
};

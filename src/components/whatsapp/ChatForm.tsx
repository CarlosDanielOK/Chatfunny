import { IChatFormProps } from "@/interfaces/types";
import React from "react";
import { IoAttach } from "react-icons/io5";
import { MdOutlineCameraAlt } from "react-icons/md";

export const ChatForm: React.FC<IChatFormProps> = ({
  onSubmit,
  messageValue,
  handleSubmit,
  register,
}) => {
  return (
    <section className="h-16 w-full absolute bottom-0 flex flex-col items-center justify-center px-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2"
      >
        <article className="bg-[#1f272a] h-12 ml-0.5 flex items-center rounded-full px-3 w-full max-w-[85%] min-w-[150px]">
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
  );
};

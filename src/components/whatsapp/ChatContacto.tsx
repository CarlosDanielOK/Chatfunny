import { IChatContactoProps } from "@/interfaces/types";
import Image from "next/image";
import { BiVideo } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineCall } from "react-icons/md";

export const ChatContacto: React.FC<IChatContactoProps> = ({
  contactPhoto,
  contactName,
  contactStatus,
}) => {
  return (
    <section className="h-16 w-full flex justify-between items-center px-1 bg-[#0b1014]">
      <div className="h-full w-64 flex items-center gap-1">
        <IoMdArrowBack className="h-6 w-6" />
        <Image
          src={contactPhoto}
          width={400}
          height={400}
          alt="foto de perfil"
          className="h-10 w-10 rounded-full object-cover aspect-square"
        />
        <article className="px-2 overflow-hidden max-[290px]:w-20">
          <h2 className="text-lg overflow-hidden text-nowrap text-ellipsis">
            {contactName}
          </h2>
          <p className="text-sm overflow-hidden text-nowrap text-ellipsis">
            {contactStatus}
          </p>
        </article>
      </div>
      <div className="h-full flex items-center gap-5">
        <BiVideo className="h-6 w-6" />
        <MdOutlineCall className="h-6 w-6" />
        <BsThreeDotsVertical className="h-6 w-6" />
      </div>
    </section>
  );
};

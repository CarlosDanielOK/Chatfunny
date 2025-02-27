import { UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";

export interface IMessage {
  id: number;
  text: string;
  sender: "yo" | "contacto";
  time: string;
}

export interface IFormValues {
  message: string;
  sender: "yo" | "contacto";
  contactName: string;
  contactStatus: string;
  contactPhoto: string;
}

export interface IChatContactoProps {
  contactPhoto: string;
  contactName: string;
  contactStatus: string;
}

export interface IChatMensajesProps {
  messages: IMessage[];
}

export interface IChatFormProps {
  onSubmit: (data: IFormValues) => void;
  messageValue: string;
  handleSubmit: UseFormHandleSubmit<IFormValues>;
  register: UseFormRegister<IFormValues>;
}

export interface IChatSettingsProps {
  contactName: string;
  contactStatus: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadStatus: "idle" | "loading" | "success" | "error";
  uploadError: string | null;
  watch: UseFormWatch<IFormValues>;
  register: UseFormRegister<IFormValues>;
}

import { GlitchText } from "./animations/GlitchText";
import { SplitText } from "./animations/SplitText";
import { Cards } from "./Cards";
import { CircularGallery } from "./animations/CircularGallery";
import Image from "next/image";
import { ScrollButton } from "./ScrollButton";

export const Presentacion = () => {
  return (
    <main>
      <section className="mt-8 sm:mt-10 md:mt-12">
        <h1 className="flex flex-col justify-center items-center truncate">
          <SplitText
            text="Crea chats ficticios de WhatsApp, Instagram y Facebook."
            className="text-xl font-semibold text-center w-[95%] sm:text-2xl sm:w-[90%] md:text-4xl md:w-[85%] lg:text-6xl lg:w-[85%] xl:w-[75%] 2xl:w-[65%]"
            delay={20}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={false}
            className="custom-class"
          >
            Tan real que te creerán.
          </GlitchText>
        </h1>
        <div className="relative h-96 md:h-[500px] lg:h-[600px]">
          <CircularGallery
            items={[]}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
          />
        </div>
      </section>
      <section id="cards-section">
        <h2 className="flex flex-col justify-center items-center truncate mt-10 mb-6">
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

      <section>
        <h2 className="flex justify-center items-center truncate mt-10 md:mt-16">
          <SplitText
            text="Fiel al diseño original de las aplicaciones para que sea creíble"
            className="text-xl font-semibold text-center w-[95%] sm:text-2xl sm:w-[90%] md:text-3xl md:w-[85%] lg:text-4xl lg:w-[85%] xl:w-[75%] 2xl:w-[65%]"
            delay={20}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </h2>
        <article className="flex flex-col sm:flex-row justify-center items-center">
          <div className="sm:w-[90vw] md:w-[80vw] lg:w-[60vw] flex flex-col sm:flex-row justify-center items-center my-4">
            <div className="w-[90vw] md:w-[50%] flex justify-center items-center gap-6 flex-wrap">
              <Image
                src="/whatsappui.jpg"
                width={400}
                height={400}
                alt="WhatsApp UI"
                className="w-72 shadow-md shadow-red-500 rounded-lg"
              ></Image>
              <Image
                src="/instagramui.jpg"
                width={400}
                height={400}
                alt="Instagram UI"
                className="w-72 shadow-md shadow-red-500 rounded-lg"
              ></Image>
              <Image
                src="/facebookui.jpg"
                width={400}
                height={400}
                alt="Facebook UI"
                className="w-72 shadow-md shadow-red-500 rounded-lg"
              ></Image>
            </div>
          </div>
        </article>
      </section>

      <section>
        <h2 className="flex justify-center items-center truncate mt-10">
          <SplitText
            text="Envía mensajes de texto, emojis y fotos"
            className="text-xl font-semibold text-center w-[95%] sm:text-2xl sm:w-[90%] md:text-3xl md:w-[85%] lg:text-4xl lg:w-[85%] xl:w-[75%] 2xl:w-[65%]"
            delay={20}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </h2>
        <article className="flex flex-col sm:flex-row justify-center items-center">
          <div className="sm:w-[90vw] md:w-[80vw] lg:w-[60vw] flex flex-col sm:flex-row justify-center items-center sm:my-4">
            <div className="w-[90vw] my-4 md:w-[50%] sm:flex sm:justify-center sm:px-4 sm:items-center">
              <p className="sm:max-w-96 md:text-lg">
                Escribe <span className="font-bold">!foto</span> para enviar una
                foto solo para verse una vez. Y envía los emojis incluidos en tu celular para más realismo.
              </p>
            </div>
            <div className="w-[90vw] md:w-[50%] flex justify-center items-center flex-col gap-6">
              <Image
                src="/whatsappmsj.jpg"
                width={400}
                height={400}
                alt="WhatsApp fotos"
                className="w-72 shadow-md shadow-red-500 rounded-lg"
              ></Image>
              <Image
                src="/instagrammsj.jpg"
                width={400}
                height={400}
                alt="Instagram fotos"
                className="w-72 shadow-md shadow-red-500 rounded-lg"
              ></Image>
              <Image
                src="/facebookmsj.jpg"
                width={400}
                height={400}
                alt="Facebook fotos"
                className="w-72 shadow-md shadow-red-500 rounded-lg"
              ></Image>
            </div>
          </div>
        </article>
      </section>
      <section>
        <h2 className="flex justify-center items-center truncate mt-10">
          <SplitText
            text="Personaliza el chat"
            className="text-xl font-semibold text-center w-[95%] sm:text-2xl sm:w-[90%] md:text-3xl md:w-[85%] lg:text-4xl lg:w-[85%] xl:w-[75%] 2xl:w-[65%]"
            delay={20}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </h2>
        <article className="flex flex-col sm:flex-row justify-center items-center">
          <div className="sm:w-[90vw] md:w-[80vw] lg:w-[60vw] flex flex-col sm:flex-row justify-center items-center sm:my-4">
            <div className="w-[90vw] my-4 md:w-[50%] sm:flex sm:justify-center sm:px-4 sm:items-center">
              <p className="sm:max-w-96 md:text-lg">
                Configura el chat a tu gusto, puedes{" "}
                <span className="font-bold">
                  elegir quién envía los mensajes
                </span>
                ,{" "}
                <span className="font-bold">editar el nombre del contacto</span>
                ,{" "}
                <span className="font-bold">editar su estado de conexión</span>{" "}
                (por ejemplo: En línea, Activo(a) ahora, últ. vez hoy a las
                01:01, Activo(a) hace 25 min, etcétera), y{" "}
                <span className="font-bold">
                  actualizar su foto de perfil. Todo esto en tiempo real.
                </span>
              </p>
            </div>
            <div className="w-[90vw] md:w-[50%] flex justify-center items-center">
              <Image
                src="/settingschat.jpg"
                width={400}
                height={400}
                alt="Configuración del chat"
                className="w-72 shadow-md shadow-red-500 rounded-lg"
              ></Image>
            </div>
          </div>
        </article>
      </section>
      <section>
        <h2 className="flex justify-center items-center truncate mt-10">
          <SplitText
            text="Súbelo a tus redes sociales"
            className="text-xl font-semibold text-center w-[95%] sm:text-2xl sm:w-[90%] md:text-3xl md:w-[85%] lg:text-4xl lg:w-[85%] xl:w-[75%] 2xl:w-[65%]"
            delay={20}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </h2>
        <article className="flex flex-col sm:flex-row justify-center items-center">
          <div className="sm:w-[90vw] md:w-[80vw] lg:w-[60vw] flex flex-col sm:flex-row justify-center items-center sm:my-4">
            <div className="w-[90vw] my-4 md:w-[50%] sm:flex sm:justify-center sm:px-4 sm:items-center">
              <p className="sm:max-w-96 md:text-lg">
                Saca una{" "}
                <span className="font-bold">captura de pantalla del chat</span>{" "}
                con el botón &quot;Captura de pantalla&quot;, o podes{" "}
                <span className="font-bold">
                  sacar una Screeshot con tu celular (recomendado).
                </span>{" "}
                Luego,{" "}
                <span className="font-bold">súbelo a tus redes sociales</span>{" "}
                para reírte con tus amig@s y crean que es una conversación real.
              </p>
            </div>
            <div className="w-[90vw] md:w-[50%] flex justify-center items-center">
              <Image
                src="/screenshot.jpg"
                width={400}
                height={400}
                alt="Captura de pantalla de un chat"
                className="w-72 shadow-md shadow-red-500 rounded-lg"
              ></Image>
            </div>
          </div>
        </article>
      </section>
      <section className="flex justify-center items-center mt-10">
        <ScrollButton targetId="cards-section" buttonText="Crear ahora" />
      </section>
    </main>
  );
};

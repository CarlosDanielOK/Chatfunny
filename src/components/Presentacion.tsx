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
            Crea tu versión de la historia.
          </GlitchText>
          {/* <SplitText
            text="Compártelo en tus redes sociales."
            className="text-xl font-semibold text-center w-[95%] sm:text-2xl sm:w-[90%] md:text-4xl md:w-[85%] lg:text-6xl lg:w-[85%] xl:w-[75%] 2xl:w-[65%]"
            delay={20}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          /> */}
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
        <h2 className="flex justify-center items-center truncate mt-10">
          <SplitText
            text="Configurar el chat"
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
                <span className="font-bold">actualizar su foto de perfil</span>.
              </p>
            </div>
            <div className="w-[90vw] md:w-[50%] flex justify-center items-center">
              <Image
                src="/settingschat.jpg"
                width={400}
                height={400}
                alt="Configuración del chat"
                className="w-72 shadow-lg shadow-red-500 rounded-lg"
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
                Puedes sacar una{" "}
                <span className="font-bold">
                  captura de pantalla de tu chat personalizado
                </span>{" "}
                con el botón de captura, o puedes{" "}
                <span className="font-bold">
                  sacar una captura de pantalla con tu celular
                </span>
                . Luego, puedes{" "}
                <span className="font-bold">subirlo a tus redes sociales</span>{" "}
                para divertirte.
              </p>
            </div>
            <div className="w-[90vw] md:w-[50%] flex justify-center items-center">
              <Image
                src="/screenshot.jpg"
                width={400}
                height={400}
                alt="Captura de pantalla de un chat"
                className="w-72 shadow-lg shadow-red-500 rounded-lg"
              ></Image>
            </div>
          </div>
        </article>
      </section>
      <section className="flex justify-center items-center mt-12">
        <ScrollButton targetId="cards-section" buttonText="Crear ahora" />
      </section>
    </main>
  );
};

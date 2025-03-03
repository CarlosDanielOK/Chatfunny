import { CircularGallery } from "./animations/CircularGallery";
import { GlitchText } from "./animations/GlitchText";
import { SplitText } from "./animations/SplitText";
import { Cards } from "./Cards";

export const Presentacion = () => {
  return (
    <main>
      <section className="mt-8 sm:mt-10 md:mt-12">
        <h1 className="flex flex-col justify-center items-center truncate">
          <SplitText
            text="Crea el chat que te imaginas."
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
        </h1>
        <div className="relative h-96 md:h-[500px] lg:h-[600px]">
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
        </div>
      </section>
      <section>
        <h2 className="flex flex-col justify-center items-center truncate mt-10 mb-6">
          <SplitText
            text="Elige tu chat personalizado:"
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
    </main>
  );
};

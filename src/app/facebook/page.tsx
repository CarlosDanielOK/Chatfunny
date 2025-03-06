import { FacebookChat } from "@/components/FacebookChat";
import { SplitText } from "@/components/animations/SplitText";

export default function Facebook() {
  return (
    <>
      <h2 className="flex flex-col justify-center items-center truncate my-6 sm:mt-12 sm:mb-10">
        <SplitText
          text="Crea un chat ficticio de Facebook"
          className="text-xl font-semibold text-center w-[95%] sm:text-2xl sm:w-[90%] md:text-4xl md:w-[85%] lg:text-5xl lg:w-[85%] xl:w-[75%] 2xl:w-[65%]"
          delay={20}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />
      </h2>
      <FacebookChat />
    </>
  );
}

import React from "react";
import { SpotlightCard } from "./animations/SpotlightCard";
import Image from "next/image";
import Link from "next/link";
import { StarBorder } from "./animations/StarBorder";

export const Cards = () => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-6 md:gap-12 lg:gap-24">
      <SpotlightCard
        className="custom-spotlight-card h-72 w-72 flex flex-col justify-between items-center"
        spotlightColor="rgba(33, 192, 99, 0.4)"
      >
        <Image
          src="/whatsapp.png"
          width={400}
          height={400}
          alt="WhatsApp"
          className="w-12 h-12 rounded-md"
        />
        <h2 className="text-xl font-bold">WhatsApp</h2>
        <p className="text-center">Crea un chat ficticio para WhatsApp.</p>
        <Link href="/whatsapp">
          <StarBorder
            as="button"
            className="custom-class"
            color="#3fe25d"
            speed="6s"
          >
            Crear ahora
          </StarBorder>
        </Link>
      </SpotlightCard>

      <SpotlightCard
        className="custom-spotlight-card h-72 w-72 flex flex-col justify-between items-center"
        spotlightColor="rgba(255, 0, 196, 0.4)"
      >
        <Image
          src="/instagram.png"
          width={400}
          height={400}
          alt="Instagram"
          className="w-12 h-12 rounded-md"
        />
        <h2 className="text-xl font-bold">Instagram</h2>
        <p className="text-center">
          Crea un chat ficticio para Instagram.
        </p>
        <Link href="/instagram">
          <StarBorder
            as="button"
            className="custom-class"
            color="#ff00c9"
            speed="6s"
          >
            Crear ahora
          </StarBorder>
        </Link>
      </SpotlightCard>

      <SpotlightCard
        className="custom-spotlight-card h-72 w-72 flex flex-col justify-between items-center"
        spotlightColor="rgba(8, 102, 255, 0.4)"
      >
        <Image
          src="/facebook.png"
          width={400}
          height={400}
          alt="Facebook"
          className="w-12 h-12 rounded-md"
        />
        <h2 className="text-xl font-bold">Facebook</h2>
        <p className="text-center">Crea un chat ficticio para Facebook.</p>
        <Link href="/facebook">
          <StarBorder
            as="button"
            className="custom-class"
            color="#0866fe"
            speed="6s"
          >
            Crear ahora
          </StarBorder>
        </Link>
      </SpotlightCard>

      <SpotlightCard
        className="custom-spotlight-card h-72 w-72 flex flex-col justify-between items-center"
        spotlightColor="rgba(8, 102, 255, 0.4)"
      >
        <Image
          src="/messenger.png"
          width={400}
          height={400}
          alt="Messenger"
          className="w-12 h-12 rounded-md"
        />
        <h2 className="text-xl font-bold">Messenger</h2>
        <p className="text-center">Crea un chat ficticio para Messenger.</p>
        <Link href="/facebook">
          <StarBorder
            as="button"
            className="custom-class"
            color="#0866ff"
            speed="6s"
          >
            Crear ahora
          </StarBorder>
        </Link>
      </SpotlightCard>
    </div>
  );
};

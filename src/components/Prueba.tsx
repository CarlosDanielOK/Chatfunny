'use client';

import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";

const images = [
  "/screenshot1.png",
  "/screenshot2.png",
  "/screenshot3.png"
];

export const LoginComponent = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <Image
        src={images[currentImageIndex]}
        width={300}
        height={300}
        alt="foto"
      />
    </main>
  );
};

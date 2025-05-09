import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl text-center font-bold mb-4 px-1">404 - Página no encontrada</h1>
      <p className="text-lg text-center mb-8 px-1">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link href="/" className="py-3 px-4 bg-blue-600 rounded-full hover:bg-blue-800">
        Volver al inicio
      </Link>
    </div>
  );
}

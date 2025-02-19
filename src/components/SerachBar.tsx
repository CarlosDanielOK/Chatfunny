import React from "react";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  searchActive: boolean;
  setSearchActive: (active: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchActive,
  setSearchActive,
}) => {
  return (
    <>
      <button
        onClick={() => setSearchActive(true)}
        className="hover:text-gray-300 transition"
      >
        <IoSearch className="w-7 h-7 lg:w-6 lg:h-6" />
      </button>
      {searchActive && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-75 backdrop-blur-sm p-4">
          <div className="flex justify-end">
            <button
              onClick={() => setSearchActive(false)}
              className="text-5xl font-bold"
              aria-label="Cerrar búsqueda"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="w-full max-w-md">
              <div className="relative">
                <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  autoFocus
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

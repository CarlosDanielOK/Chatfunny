'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IoMenuOutline } from "react-icons/io5";

export const Prueba: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleMenu}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <IoMenuOutline />
            </button>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg text-white bg-[#363636] ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link href="/option1">
                            <div className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Option 1</div>
                        </Link>
                        <Link href="/option2">
                            <div className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Option 2</div>
                        </Link>
                        <Link href="/option3">
                            <div className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Option 3</div>
                        </Link>
                        <Link href="/option4">
                            <div className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Option 4</div>
                        </Link>
                        <Link href="/option5">
                            <div className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Option 5</div>
                        </Link>
                        <Link href="/option6">
                            <div className="block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Option 6</div>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
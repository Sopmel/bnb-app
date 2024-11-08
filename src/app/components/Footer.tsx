"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">

                <div>
                    <h2 className="text-lg font-semibold mb-4">Om Oss</h2>
                    <p className="text-sm text-gray-400">
                        Vi erbjuder unika och oförglömliga upplevelser på fantastiska destinationer världen över.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4">Snabblänkar</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link href="#" className="hover:underline hover:text-gray-100">About</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline hover:text-gray-100">Contact</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline hover:text-gray-100">Policy</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:underline hover:text-gray-100">Terms</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-4">Följ Oss</h2>
                    <div className="flex space-x-4 text-2xl">
                        <Link href="#" target="_blank" className="hover:text-blue-500">
                            <FaFacebook />
                        </Link>
                        <Link href="#" target="_blank" className="hover:text-pink-500">
                            <FaInstagram />
                        </Link>
                        <Link href="#" target="_blank" className="hover:text-blue-400">
                            <FaTwitter />
                        </Link>
                        <Link href="#" target="_blank" className="hover:text-blue-700">
                            <FaLinkedin />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

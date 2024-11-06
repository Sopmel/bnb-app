"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">

                {/* About Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Om Oss</h2>
                    <p className="text-sm text-gray-400">
                        Vi erbjuder unika och oförglömliga upplevelser på fantastiska destinationer världen över.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Snabblänkar</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/about" className="hover:underline hover:text-gray-100">Om Oss</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline hover:text-gray-100">Kontakt</Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:underline hover:text-gray-100">Integritetspolicy</Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:underline hover:text-gray-100">Användarvillkor</Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Följ Oss</h2>
                    <div className="flex space-x-4 text-2xl">
                        <Link href="https://facebook.com" target="_blank" className="hover:text-blue-500">
                            <FaFacebook />
                        </Link>
                        <Link href="https://instagram.com" target="_blank" className="hover:text-pink-500">
                            <FaInstagram />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" className="hover:text-blue-400">
                            <FaTwitter />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="hover:text-blue-700">
                            <FaLinkedin />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Airbnb Clone. Alla rättigheter förbehållna.
            </div>
        </footer>
    );
}

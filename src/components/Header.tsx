import Link from "next/link";
import React from "react";
import { Roboto, Inter } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function Header() {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header className="fixed z-50 top-0 left-0 w-full border-b border-gray-900 backdrop-blur-lg">
      <div className="flex items-center justify-between py-4 px-32">
        <div className="flex items-center gap-2">
          <Link href="/" className={`${roboto.className} text-xl font-bold`}>
            Nebuna
          </Link>
        </div>
        <nav className={`${inter.className} flex items-center`}>
          <ul className="flex gap-4 px-4 rounded-lg">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="flex items-center px-3 font-medium rounded-lg text-xs text-gray-400 h-8 cursor-pointer hover:bg-zinc-900 hover:text-white"
              >
                <Link href={item.href} aria-label={`nav-${item.name}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`flex items-center gap-2 text-xs ${inter.className}`}>
          <button className="text-gray-400 font-medium px-3 cursor-pointer h-8 hover:bg-zinc-900 rounded-lg hover:text-white">
            Sign in
          </button>
          <div className="flex rounded-lg h-8 px-3 font-medium items-center justify-center p-[1px] hover:shadow-lg bg-gray-200 hover:bg-white">
            <button className="cursor-pointer text-black rounded-xl h-full w-full">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

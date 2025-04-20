"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

function Profile() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Toggle floating window
  const toggleWindow = () => {
    setIsOpen((prev) => !prev); // Correctly toggles the state
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center ml-1 mr-1 pb-2">
      {/* Profile Button */}
      <div
        ref={buttonRef}
        className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-zinc-800 transition-colors duration-200"
        onClick={toggleWindow}
      >
        <div className="pl-1">
          <Image
            src={session?.user?.image || "/favicon.ico"}
            alt={
              `${session?.user?.name}`
                ? `${session?.user?.name}'s profile picture`
                : "Profile"
            }
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        <div className="flex flex-col min-w-0 justify-center flex-grow">
          <p className="text-md font-bold truncate leading-tight">
            {session?.user?.name || "Guest"}
          </p>
          <p className="text-xs font-medium text-gray-400 truncate">
            {session?.user?.email || "No email available"}
          </p>
        </div>

        <div className="ml-auto">
          <Image
            src="/unfold_more.svg"
            alt="Arrow Down"
            width={25}
            height={25}
          />
        </div>
      </div>

      {/* Floating Window Beside Profile (Bottom Edge Aligned) */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-auto bottom-0 left-full ml-2 bg-zinc-900 text-white shadow-lg rounded-xl p-3 w-60 z-50"
        >
          <div className="flex items-center gap-2">
            <Image
              src={session?.user?.image || "/favicon.ico"}
              alt={
                session?.user?.name
                  ? `${session?.user?.name}'s profile picture`
                  : "Profile"
              }
              width={32}
              height={32}
              className="rounded-full w-8 h-8"
            />
            <div className="flex flex-col min-w-0 justify-center">
              <p className="text-sm font-bold truncate">
                {session?.user?.name || "Guest"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {session?.user?.email || "No email available"}
              </p>
            </div>
          </div>
          <hr className="my-2 border-zinc-700" />
          <div className="flex gap-1.5 p-2 cursor-pointer rounded hover:bg-zinc-700">
            <Image src="/person.png" alt="Logout" width={20} height={20} />
            <button className="w-full text-left text-sm  cursor-pointer">
              Account
            </button>
          </div>
          <div className="flex gap-1.5 p-2 cursor-pointer rounded hover:bg-zinc-700">
            <Image
              src="/notifications.png"
              alt="Logout"
              width={20}
              height={20}
            />
            <button className="w-full text-left text-sm cursor-pointer">
              Notifications
            </button>
          </div>
          <hr className="my-2 border-zinc-700" />
          <div className="flex gap-1.5 p-2 cursor-pointer rounded hover:bg-zinc-800">
            <Image src="/logout.png" alt="Logout" width={20} height={20} />
            <button
              className="w-full text-left text-sm text-[#d63838] cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

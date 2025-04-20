import React from "react";
import Profile from "@/components/Profile";

function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-screen w-3/16 bg-zinc-900">
      <div className="px-4 py-2">
        <p className="text-lg font-bold">Nebuna Inc.</p>
        <p className="text-sm">Zero risk, Infinite potential</p>
      </div>
      <div>
        <hr className="my-2 border-zinc-700" />
        <Profile />
      </div>
    </div>
  );
}

export default Sidebar;

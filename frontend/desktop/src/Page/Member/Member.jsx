import React from "react";

import { Sidebar } from "../Sidebar/sidebar";
import { MemberCard } from "./MemberCard";

export default function Member() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 flex">
      <Sidebar />

      <div className="flex-1 md:ml-64 mt-16 md:mt-0 flex justify-center items-start px-4 pt-10 sm:px-8 pb-12">
        <MemberCard />
      </div>
    </div>
  );
}
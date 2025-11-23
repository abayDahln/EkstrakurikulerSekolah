import React from "react";
import { Card } from "./AbsenCard";
import { Sidebar } from "../Sidebar/sidebar";

export default function Absen() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-400 to-blue-200">
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-64 p-4 pt-35 sm:p-10 flex justify-center items-start">
        <div className="w-full max-w-5xl">
          <Card />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Card } from "./HomeCard";
import { Sidebar } from "../Sidebar/sidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-200 flex">
      <Sidebar />

      <div className="flex-1 md:ml-64 mt-16 md:mt-0 flex justify-center px-4 sm:px-8">
        <Card />
      </div>
    </div>
  );
}
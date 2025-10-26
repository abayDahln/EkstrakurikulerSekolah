import React from "react";
import { Navbar } from "./JadwalNavbar";
import { ScheduleManager } from "./JadwalAdd";

export default function Jadwal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-400 pb-12 font-sans">
      <Navbar />
      <div className="flex pt-10">
        <ScheduleManager />
      </div>
    </div>
  );
}
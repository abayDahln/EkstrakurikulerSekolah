import React from "react";
import { ScheduleManager } from "./JadwalAdd";
import { Sidebar } from "../Sidebar/sidebar";

export default function Jadwal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-400 pb-12 font-sans">
      <Sidebar />
      <div className="flex pt-10">
        <ScheduleManager />
      </div>
    </div>
  );
}
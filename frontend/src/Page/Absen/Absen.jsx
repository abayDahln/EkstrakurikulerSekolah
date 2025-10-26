import React from "react";
import { Navbar } from "./AbsenNavbar";
import { Card } from "./AbsenCard";

export default function Absen() {
    return (
        <div className="min-h-screen bg-blue-400">
            <Navbar />
            <div className="flex justify-center pr-3 pl-3 pt-20 pb-10 sm:pt-10">
                <Card />
            </div>
        </div>
    );
}
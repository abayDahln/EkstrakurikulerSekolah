import React from "react"
import { Card } from "./DokumCard"
import { Navbar } from "./DokumNavbar"

export default function Dokum(){
    return(
        <div className="min-h-screen bg-blue-400">
            <Navbar />
            <div className="flex justify-center pt-20 pb-10 sm:pt-10">
                <Card />
            </div>
        </div>
     )
}
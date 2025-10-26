import React from "react"
import { Card } from "./HomeCard"
import { Navbar } from "./HomeNavbar"

export default function Home(){
    return(
        <div className="min-h-screen bg-blue-400">
            <Navbar />
            <div className="flex justify-center pt-8 sm:pt-8">
            <Card />
            </div>
        </div>
    )
}
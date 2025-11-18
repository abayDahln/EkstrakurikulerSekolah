import React from "react";
import { Isi } from "./LandingUI";
import { LoginButton} from "./LandingLogic"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 font-sans">
      <header className="absolute top-0 w-full z-10">
        <LoginButton />
      </header>
      <Isi />
    </div>
  );
}
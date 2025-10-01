import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Login(){
  return(
      <strong className="text-black text-3xl flex justify-start mb-4 pt-35">LOGIN</strong>
  )
}

function Form(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  function handleUsernameChange(e){
    setUsername(e.target.value);
  }
  function handlePasswordChange(e){
    setPassword(e.target.value);
  }


  function handleSubmit(e){
    e.preventDefault();
    alert(`Username: ${username}, Password: ${password}`);
  }

  return(
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <input 
      type="text"
      value={username}
      onChange={handleUsernameChange} 
      placeholder="Username/Email" 
      className="shadow-lg text-black p-3 rounded w-110"
      />
      <input 
      type="password"
      value={password}
      onChange={handlePasswordChange}
      placeholder="Password"
      className="shadow-lg text-black p-3 rounded w-110"
      />

      <div className="flex items-center justify-between w-110">
        <a
        className="text-blue-500">
          Belum Punya Akun? Daftar
        </a>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 min-w-35 h-full max-h-8 flex items-center justify-center w-30"
        >
        Login
        </button>
      </div>
    </form>
  );
}

export default function Log(){
  return (
    <div className="h-screen w-screen flex justify-start relative overflow-hidden">
      <div className="pl-5 pt-10 z-10">
        <Login />
        <Form />
      </div>

      <div className="absolute inset-0 flex justify-end items-center">
        <div className="w-[1200px] h-[800px] bg-blue-200 rounded-full translate-x-1/2"></div>
        <div className="w-[1000px] h-[800px] bg-blue-300 rounded-full absolute right-0 translate-x-1/2"></div>
        <div className="w-[800px] h-[800px] bg-sky-500/100 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"></div>
      </div>
    </div>
  );
}


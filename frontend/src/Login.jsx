import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

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
      className="shadow-lg text-black p-3 rounded w-70 sm:w-110 bg-gray-100"
      />
      <input 
      type="password"
      value={password}
      onChange={handlePasswordChange}
      placeholder="Password"
      className="shadow-lg text-black p-3 rounded w-70 sm:w-110 bg-gray-100"
      />

      <div className="flex items-center justify-between w-70 sm:w-110">
        <a
        className="text-blue-500 text-sm">
          Belum Punya Akun? Daftar
        </a>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 min-w-10 h-full max-h-8 flex items-center justify-center w-25 sm:w-40"
        >
        Login
        </button>
      </div>
    </form>
  );
}

export default function Log() {
  return (
    <div className="h-screen w-screen flex justify-start relative overflow-hidden">

      <div className="block sm:hidden z-10 pl-10 pt-[25%]">
        <Login />
        <Form />
      </div>

      <div className="hidden sm:block z-10 pl-[5%] pt-[30px]">
        <Login />
        <Form />
      </div>

      <div className="block sm:hidden absolute inset-0 flex justify-around items-end">
        <div className="z-1 w-[300px] h-[300px] bg-sky-200 rounded-full translate-x-1/2"></div>
        <div className=" w-[350px] h-[350px] bg-blue-300 rounded-full absolute right-10 -top-20 translate-x-1/2"></div>
        <div className="w-[200px] h-[200px] bg-blue-200 rounded-full absolute -left-[200px] -bottom-[185px] -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="hidden sm:block absolute inset-0 flex justify-end items-center">
        <div className="relative w-full h-full">
          <div className="w-[1200px] h-[800px] bg-blue-100 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"></div>
          <div className="w-[1000px] h-[800px] bg-blue-200 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"></div>
          <div className="w-[800px] h-[800px] bg-blue-300 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>

    </div>
  );
}

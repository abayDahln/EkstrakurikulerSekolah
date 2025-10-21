import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  return (
    <strong className="text-black text-3xl flex justify-start mb-4 pt-35">
      LOGIN
    </strong>
  );
}

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_URL = "http://localhost:5000/api/auth/login/pembina";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = "Login gagal. Cek kredensial Anda.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log("Login successful:", data);
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      navigate("/home");
    } catch (err) {
      setError(err.message);
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukkan Email"
        className="shadow-lg text-black p-3 rounded w-70 sm:w-110 bg-gray-100"
        whileFocus={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        disabled={loading}
        required
      />
      <motion.input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Masukkan Password"
        className="shadow-lg text-black p-3 rounded w-70 sm:w-110 bg-gray-100"
        whileFocus={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        disabled={loading}
        required
      />

      <div className="flex items-center justify-end w-70 sm:w-110">
        {error && (
            <p className="text-red-500 text-sm mr-4">{error}</p>
        )}
        <motion.button
          type="submit"
          className={`
            p-3 rounded min-w-10 h-full max-h-8 flex items-center justify-center w-25 sm:w-40 text-white font-bold
            ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }
          `}
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
          disabled={loading} 
        >
          {loading ? 'Memproses...' : 'Login'}
        </motion.button>
      </div>
    </motion.form>
  );
}

export default function Log() {
  return (
    
    <div className="h-screen w-screen flex justify-start relative overflow-hidden">
      <motion.div
        className="block sm:hidden z-10 pl-5 pt-[25%]"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Login />
        <Form />
      </motion.div>

      <motion.div
        className="hidden sm:block z-10 pl-[5%] pt-[30px]"
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Login />
        <Form />
      </motion.div>

      <div className="block sm:hidden absolute inset-0 flex justify-around items-end">
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-1 w-[300px] h-[300px] bg-sky-200 rounded-full translate-x-1/2"
        ></motion.div>

        <motion.div
          initial={{ y: -400, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-[350px] h-[350px] bg-blue-300 rounded-full absolute right-10 -top-20 translate-x-1/2"
        ></motion.div>

        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="w-[200px] h-[200px] bg-blue-200 rounded-full absolute -left-[200px] -bottom-[185px] -translate-y-1/2 translate-x-1/2"
        ></motion.div>
      </div>

      <div className="hidden sm:block absolute inset-0 flex justify-end items-center">
        <div className="relative w-full h-full">
          <motion.div
            initial={{ x: 600, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-[1200px] h-[800px] bg-blue-100 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
          ></motion.div>

          <motion.div
            initial={{ x: 800, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-[1000px] h-[800px] bg-blue-200 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
          ></motion.div>

          <motion.div
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="w-[800px] h-[800px] bg-blue-300 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
          ></motion.div>
        </div>
      </div>
    </div>
  );
}

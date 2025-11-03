import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setToken } from "../../utils/utils";

export function Form() {
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

      
      const responseBody = await response.json();
      const token = responseBody.data.token;     

      if (token) {
          setToken(token);
          navigate("/home");
      }
      else {
      throw new Error("Tidak dapat menemukan Token");
      }

    } 
    catch (err) { 
      setError(err.message);
      } 
    finally {
      setLoading(false);
      }
    };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }} >

      <motion.input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukkan Email"
        className="shadow-lg text-black p-3 rounded w-70 sm:w-110 bg-gray-100"
        whileFocus={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        disabled={loading}
        required />

      <motion.input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Masukkan Password"
        className="shadow-lg text-black p-3 rounded w-70 sm:w-110 bg-gray-100"
        whileFocus={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        disabled={loading}
        required />

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
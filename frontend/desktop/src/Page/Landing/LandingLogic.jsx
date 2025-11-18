import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getToken } from "../../utils/utils";

export function LoginButton() {
  const navigate = useNavigate();


  useEffect(() => {
      const token = getToken();
      if (token) {
        navigate("/home", { replace: true });
      }
    }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex justify-end p-4 sm:p-6"
    >
      <button
        onClick={() => navigate("/login")}
        className="bg-gradient-to-r from-gray-800 to-gray-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-lg hover:from-gray-900 hover:to-gray-800 hover:scale-105 transition-all duration-300"
      >
        🔑 Login Pembina
      </button>
    </motion.div>
  );
}
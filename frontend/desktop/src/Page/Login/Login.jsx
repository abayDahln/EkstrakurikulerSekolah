import React from "react";
import { motion } from "framer-motion";
import { Login } from "./LoginUI";
import { Form } from "./LoginLogic";

export default function Log() {
  return (
    
    <div className="h-screen w-screen flex justify-start relative overflow-hidden">
      <motion.div
        className="block sm:hidden z-10 pl-5 pt-[25%]"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }} >
        <Login />
        <Form />
      </motion.div>

      <motion.div
        className="hidden sm:block z-10 pl-[5%] pt-[30px]"
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }} >
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
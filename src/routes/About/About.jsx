import React from "react";
import "./AboutSyles.css";
import Navbar from "../../Components/Navbar/Navbar";
import Fotter from "../../Components/Fotter/Fotter";
import { motion } from "framer-motion";
const About = () => {
  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="about"
      >
        <h1>About</h1>
      </motion.section>
      <Fotter />
    </>
  );
};

export default About;

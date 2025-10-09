import React, { useEffect, useState } from "react";
import "./Contact.css";
import Navbar from "../../Components/Navbar/Navbar";
import Fotter from "../../Components/Fotter/Fotter";
import { motion } from "framer-motion";
const Contact = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost/blog%20backend/connect.php")
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  return (
    <>
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="contact"
      >
        <h1>Contact</h1>

      </motion.section>
      <Fotter />
    </>
  );
};

export default Contact;

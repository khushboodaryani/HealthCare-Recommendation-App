import React from "react";
import { motion } from "framer-motion";

const Header = () => (
  <motion.header
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{ background: "#6200ea", padding: "10px", color: "white", textAlign: "center" }}
  >
    <h1>Healthcare Recommendation App</h1>
  </motion.header>
);

export default Header;


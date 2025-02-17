/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/max1mde/portfolio)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import { motion } from "framer-motion";

export default function ScrollButton() {
  const scrollToTechSection = () => {
    window.scrollTo({
      top: window.innerHeight * 1.1,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTechSection}
      className="c-cursor-pointer rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </motion.button>
  );
}

/**
 * Portfolio
 * Copyright (C) 2025 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function Parallax() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const layer1Movement = useTransform(scrollY, [0, 1500], [0, -1500]);
  const layer2Movement = useTransform(scrollY, [0, 1500], [0, -1200]);
  const layer3Movement = useTransform(scrollY, [0, 1500], [0, -900]);
  const middleMovement = useTransform(scrollY, [0, 1500], [0, -1500]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full"
        style={{
          backgroundImage: "url(/images/parallax/layer_4.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -4,
        }}
      />

      {!isMobile && (
        <>
          <motion.div
            className="absolute top-0 w-full"
            style={{
              backgroundImage: "url(/images/parallax/layer_3.svg)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "110vh",
              y: layer3Movement,
              zIndex: -3,
            }}
          />
          <motion.div
            className="absolute top-0 w-full"
            style={{
              backgroundImage: "url(/images/parallax/layer_3.png)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "110vh",
              y: layer3Movement,
              zIndex: -3,
            }}
          />

          <motion.div
            className="absolute top-0 w-full"
            style={{
              backgroundImage: "url(/images/parallax/layer_2.svg)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "115vh",
              y: layer2Movement,
              zIndex: -2,
            }}
          />
          <motion.div
            className="absolute top-0 w-full"
            style={{
              backgroundImage: "url(/images/parallax/layer_2.png)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "115vh",
              y: layer2Movement,
              zIndex: -2,
            }}
          />

          <motion.div
            className="absolute top-0 w-full"
            style={{
              backgroundImage: "url(/images/parallax/layer_1.svg)",
              backgroundSize: "102% 100%",
              backgroundPosition: "top",
              height: "130vh",
              y: layer1Movement,
              zIndex: -1,
            }}
          />
          <motion.div
            className="absolute top-0 w-full"
            style={{
              backgroundImage: "url(/images/parallax/layer_1.png)",
              backgroundSize: "102% 100%",
              backgroundPosition: "top",
              height: "130vh",
              y: layer1Movement,
              zIndex: -1,
            }}
          />

          <motion.div
            className="absolute top-[125vh] w-full"
            style={{
              backgroundImage: "url(/images/parallax/middle.svg)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "150vh",
              y: middleMovement,
              zIndex: -1,
            }}
          />

          <motion.div
            className="absolute top-[220vh] w-full"
            style={{
              backgroundImage: "url(/images/parallax/middle.svg)",
              backgroundSize: "100% 100%",
              backgroundPosition: "top",
              height: "150vh",
              y: middleMovement,
              zIndex: -1,
            }}
          />
        </>
      )}
    </div>
  );
}

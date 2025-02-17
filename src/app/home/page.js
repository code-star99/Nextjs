/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { useEffect, useState } from "react";
import config from "/CONFIG.json";
import Timeline from "@/components/custom/timeline";
import ProfileSection from "@/components/custom/profile_section";
import TechScroller from "@/components/custom/tech_scroller";
import Parallax from "@/components/custom/parallax";
import ScrollButton from "@/components/custom/scroll_button";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

function useScript(url) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
}

export default function Home() {
  const homeConfig = config.pages.home;
  const { scrollY } = useScroll();

  useScript("scripts/scroll.js");

  const layer1Movement = useSpring(
    useTransform(scrollY, [0, 1500], [0, 0]),
    { stiffness: 100, damping: 22 },
  );

  return (
    <>
      <Parallax />
      <motion.div
        className="container mx-auto px-4 py-4"
        style={{ y: layer1Movement }}
      >
        <div className="flex flex-col items-center justify-center gap-2 min-h-screen -mt-16 md:-mt-32 lg:-mt-32">
          <div className="w-full max-w-4xl">
            <ProfileSection />
            <div>
              <TechScroller />
            </div>
            <div className="flex justify-center mt-4">
              <ScrollButton />
            </div>
          </div>
        </div>

        <div id="tech-section" className="min-h-[80vh] flex items-center mt-32">
          <div className="w-full">
            {homeConfig.experience.enabled && <Timeline />}
          </div>
        </div>
      </motion.div>
    </>
  );
}

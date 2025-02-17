/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
"use client";

import { Card } from "@/components/custom/card/card";
import { useState, useEffect } from "react";
import config from "/CONFIG.json";

export default function Projects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="c-cursor-text text-4xl font-bold text-center uppercase glow mb-10">
        {config.pages.projects.header}
      </h1>

      <div className="flex flex-wrap justify-center items-start gap-5 mb-10">
        {config.cards.map((card, index) => (
          <div
            key={index}
            className={`opacity-0 ${mounted ? "animate-pop_in" : ""}`}
            style={{
              animationDelay: `${index * 200}ms`,
              animationFillMode: "forwards",
            }}
          >
            <Card
              title={card.title}
              description={card.description}
              imageSRC={card.imageSRC}
              buttonText={card.buttonText}
              buttonURL={card.buttonURL}
              badges={card.badges}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

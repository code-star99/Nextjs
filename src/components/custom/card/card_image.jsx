/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const CardImage = React.forwardRef(
  (
    {
      imageSRC = "/images/projects/placeholder.png",
      title,
      className,
      ...props
    },
    ref,
  ) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      if (imageSRC) {
        const handleImageLoad = () => {
          setLoaded(true);
        };

        const img = new Image();
        img.onload = handleImageLoad;
        img.src = imageSRC;
      }
    }, [imageSRC]);

    const imageStyle = {
      filter: loaded ? "none" : "blur(10px)",
      transition: "filter 1s ease",
    };

    return (
      <div className="shine column" ref={ref} {...props}>
        <figure className="hover:before:animate-shine_anim">
          <div className="relative h-40">
            <span className="c-cursor-text absolute top-0 left-0 w-full h-full card-img-top rounded-t-xl bg-gradient-to-br from-background to-secondary flex items-center justify-center text-white text-lg z-1">
              {title}
            </span>
            {loaded && (
              <img
                src={imageSRC}
                loading="lazy"
                className={cn(
                  "absolute top-0 left-0 w-full h-full card-img-top rounded-t-xl z-2 transition-filter duration-1000 ease",
                  loaded ? "filter-none animate-move_in" : "filter blur-sm",
                )}
                style={imageStyle}
                alt="banner"
              />
            )}
          </div>
        </figure>
      </div>
    );
  },
);

CardImage.displayName = "CardImage";

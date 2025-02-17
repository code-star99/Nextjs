/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
"use client";

import { useEffect, useState, useRef } from "react";
import config from "/CONFIG.json";

const CustomCursor = () => {
  const [cursorType, setCursorType] = useState("default");
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorSize, setCursorSize] = useState(10);
  const isMobile = useRef(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());
  const observerRef = useRef(null);

  const isInitializedRef = useRef(false);
  const positionRef = useRef({ x: 0, y: 0 });

  const cursorMap = {
    default: "/cursor/normal.png",
    pointer: "/cursor/pointer.png",
    text: "/cursor/text.png",
  };

  const cursorClasses = {
    "c-cursor-pointer": "pointer",
    "c-cursor-text": "text",
    "c-cursor-custom": "custom",
  };

  const sparkleRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        isMobile.current = window.innerWidth <= 768;
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      const currentTime = Date.now();

      const deltaX = newPosition.x - lastPositionRef.current.x;
      const deltaY = newPosition.y - lastPositionRef.current.y;
      const deltaTime = currentTime - lastTimeRef.current;

      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;

      const baseSize = 40;
      const maxSize = 200;
      const minSize = 30;
      const speedMultiplier = 5;

      const newSize = Math.max(
        minSize,
        Math.min(
          maxSize,
          baseSize + Math.min(speed * speedMultiplier, maxSize - baseSize),
        ),
      );

      setCursorSize(newSize);

      mousePositionRef.current = newPosition;
      lastPositionRef.current = newPosition;
      positionRef.current = newPosition;

      lastTimeRef.current = currentTime;

      setTimeout(() => {
        if (!isInitializedRef.current) {
          const style = document.createElement("style");
          style.innerHTML = "* { cursor: none; }";
          document.head.appendChild(style);
          isInitializedRef.current = true;
        }
      }, 1);
    };

    const addDynamicCursorListeners = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList" || mutation.type === "attributes") {
            const allElements = document.querySelectorAll("*");

            allElements.forEach((el) => {
              const cursorClass = Object.keys(cursorClasses).find((cls) =>
                el.classList.contains(cls),
              );

              if (cursorClass) {
                const handleEnter = () => {
                  setCursorType(cursorClasses[cursorClass]);
                  setIsHovering(true);
                };

                const handleLeave = () => {
                  setCursorType("default");
                  setIsHovering(true);

                  setTimeout(() => {
                    setIsHovering(false);
                  }, 400);
                };

                el.removeEventListener("mouseenter", handleEnter);
                el.removeEventListener("mouseleave", handleLeave);

                el.addEventListener("mouseenter", handleEnter);
                el.addEventListener("mouseleave", handleLeave);
              }
            });
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"],
      });

      observerRef.current = observer;
    };

    if (typeof window !== "undefined" && !isMobile.current) {
      const initialPosition = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      mousePositionRef.current = initialPosition;
      lastPositionRef.current = initialPosition;
      positionRef.current = initialPosition;

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("click", handleMouseClick);
      addDynamicCursorListeners();
    }

    return () => {
      document.body.style.cursor = "default";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleMouseClick);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const createSparkle = (x, y) => {
    if (!sparkleRef.current) return;

    const numberOfSparkles = 6 + Math.floor(Math.random() * 10);

    for (let i = 0; i < numberOfSparkles; i++) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");

      const size = 1 + Math.random() * 8;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;

      const randomDirection = Math.random() * 360;
      const randomDistance = 10 + Math.random() * 30;
      const xOffset = randomDistance * Math.cos(randomDirection);
      const yOffset = randomDistance * Math.sin(randomDirection);

      const locModifier = 10;
      sparkle.style.left = `${x - size / 2 - locModifier / 2}px`;
      sparkle.style.top = `${y + window.scrollY - size / 2 - locModifier}px`;

      sparkle.style.setProperty("--x-offset", `${xOffset}px`);
      sparkle.style.setProperty("--y-offset", `${yOffset}px`);
      sparkle.style.animation = `sparkleEffect ${
        Math.random() * 0.5 + 0.5
      }s ease-out forwards`;

      sparkleRef.current.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  };

  const handleMouseClick = (e) => {
    if (config.global.custom_cursor.sparkles)
      createSparkle(e.clientX, e.clientY);

    setIsClicking(true);

    setTimeout(() => {
      setIsClicking(false);
    }, 100);
  };

  let cursorStyle = {
    position: "fixed",
    width: `${cursorSize}px`,
    height: `${cursorSize}px`,
    opacity: isInitializedRef.current ? "100%" : "0",
    pointerEvents: "none",
    zIndex: 9999,
    transform: `translate(${positionRef.current.x - cursorSize / 2}px, ${
      positionRef.current.y - cursorSize / 2
    }px)`,
    backgroundImage: `url(${cursorMap[cursorType]})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    transition:
      isInitializedRef.current && config.global.custom_cursor.transitions
        ? "all " +
          config.global.custom_cursor.move_speed +
          "s ease-out, opacity 0.3s ease-in"
        : "",
    animation: isClicking
      ? "cursorClick 0.3s ease"
      : isHovering && config.global.custom_cursor.transitions
      ? "cursorBounce 0.4s ease"
      : "none",
  };

  const keyframes = `
    @keyframes cursorBounce {
      0%, 100% { 
        transform: translate(${positionRef.current.x - cursorSize / 2}px, ${
    positionRef.current.y - cursorSize / 2
  }px) scale(1); 
      }
      50% { 
        transform: translate(${positionRef.current.x - cursorSize / 2}px, ${
    positionRef.current.y - cursorSize / 2
  }px) scale(1.3) rotate(5deg); 
      }
    }

    @keyframes cursorClick {
      0% { 
        transform: translate(${positionRef.current.x - cursorSize / 2}px, ${
    positionRef.current.y - cursorSize / 2
  }px) scale(1, 0.5)
      }
      100% { 
        transform: translate(${positionRef.current.x - cursorSize / 2}px, ${
    positionRef.current.y - cursorSize / 2
  }px) scale(1)
      }
    }

  @keyframes sparkleEffect {
  0% {
    transform: scale(0.8) translate(0, 0); 
    opacity: 1;
  }
  100% {
    transform: scale(1) translate(var(--x-offset), var(--y-offset)); 
    opacity: 0;
  }
}

.sparkle {
  position: absolute;
  background-color: white;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.8);
  z-index: 99999;
  pointer-events: none;
  animation: sparkleEffect 1s ease-out forwards;
}


  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={cursorStyle} />
      <div ref={sparkleRef} className="sparkles-container" />
    </>
  );
};

export default CustomCursor;

/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Button(
  {
    className,
    children,
    variant = "primary",
    hoverEffect = true,
    newTab = false,
    ...props
  },
  ref,
) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const buttonRef = React.useRef(null);
  const animationFrameRef = React.useRef();

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setTargetPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  React.useEffect(() => {
    const animatePosition = () => {
      setPosition((prevPos) => ({
        x: prevPos.x + (targetPosition.x - prevPos.x) * 0.1,
        y: prevPos.y + (targetPosition.y - prevPos.y) * 0.1,
      }));
      animationFrameRef.current = requestAnimationFrame(animatePosition);
    };

    if (isHovered) {
      animationFrameRef.current = requestAnimationFrame(animatePosition);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, targetPosition]);

  const variants = {
    primary:
      "text-white bg-primary hover:bg-primary relative overflow-hidden group",
    secondary:
      "text-white bg-secondary hover:bg-secondary relative overflow-hidden group",
  };

  const buttonClassName = cn(
    "c-cursor-pointer inline-block px-4 py-2 rounded-xl transform active:scale-95 active:brightness-90 transition-all duration-200 ease-in-out",
    hoverEffect && "hover:brightness-110 hover:scale-105",
    variants[variant],
    className,
  );

  const ButtonContent = () => (
    <>
      {isHovered && variant === "primary" && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-80"
          style={{
            background: `radial-gradient(60px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.4), rgba(255,255,255,0.15) 45%, transparent 75%)`,
          }}
        />
      )}
      {children}
    </>
  );

  const isInternalLink =
    typeof props.href === "string" && props.href.startsWith("/");

  if (isInternalLink && !newTab) {
    return (
      <Link
        href={props.href}
        className={buttonClassName}
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ButtonContent />
      </Link>
    );
  }

  return (
    <a
      ref={ref}
      className={buttonClassName}
      target={newTab ? "_blank" : "_self"}
      rel={newTab ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <ButtonContent />
    </a>
  );
}

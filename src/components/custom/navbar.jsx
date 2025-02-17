/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "/CONFIG.json";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const enabledPages = Object.entries(config.pages).filter(
    ([_, pageConfig]) => pageConfig.enabled,
  );

  const renderNavLinks = (isMobile = false) => (
    <>
      {enabledPages.map(([pageName, pageConfig]) => {
        const isActive = pathname === pageConfig.route;
        return (
          <li key={pageName} className={isMobile ? "w-60" : ""}>
            <Link
              href={pageConfig.route}
              className={cn(
                "c-cursor-pointer px-4 py-2 rounded-md border border-transparent transition-all duration-500 ease-in-out",
                "text-white font-medium block text-center",
                isMobile
                  ? "w-60 mb-2 text-lg border-white hover:bg-gray-700"
                  : "hover:border-white active:bg-secondary hover:shadow-2xl",
                isActive
                  ? "hover:bg-gray-700 shadow-md hover:border-white opacity-50 border-gray-700"
                  : "",
              )}
            >
              {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <nav
      className={cn(
        "p-6 sticky top-0 backdrop-blur-sm transition-all duration-200 ease-in-out",
        isScrolled && !isMobileMenuOpen ? "shadow-xl text-base" : "text-sm",
        "z-50",
      )}
    >
      <ul className="hidden md:flex justify-center items-center space-x-4">
        {renderNavLinks()}
      </ul>

      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="absolute top-2 right-4 z-50 flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
        >
          <span
            className={cn(
              "w-full h-0.5 bg-white transition-all duration-300",
              isMobileMenuOpen
                ? "rotate-45 translate-y-2"
                : "rotate-0 translate-y-0",
            )}
          />
          <span
            className={cn(
              "w-full h-0.5 bg-white transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={cn(
              "w-full h-0.5 bg-white transition-all duration-300",
              isMobileMenuOpen
                ? "-rotate-45 -translate-y-2"
                : "rotate-0 translate-y-0",
            )}
          />
        </button>

        {isMobileMenuOpen && (
          <ul
            className="fixed top-0 left-0 w-full h-screen bg-black/90 flex flex-col 
            justify-center items-center space-y-6 z-40 animate-fade-in"
          >
            {renderNavLinks(true)}
          </ul>
        )}
      </div>
    </nav>
  );
}

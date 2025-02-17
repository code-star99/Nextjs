/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shine_anim: "shine_anim .7s ease-in-out 1",
        move_in: "move_in 5s ease-in-out 1",
        pop_in: "pop_in 2s ease-in-out 1",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      pulse: {
        "0%": { opacity: "0" },
        "50%": { opacity: "0.1" },
        "100%": { opacity: "0" },
      },
      keyframes: {
        shine_anim: {
          "100%": { left: "125%" },
        },
        move_in: {
          "0%": {
            transform: "translateY(-20%) scale(0.9)",
            opacity: "0",
          },
          "40%": {
            transform: "translateY(5%) scale(0.99)",
            opacity: "1",
            filter: "brightness(1.6)",
          },
          "100%": {
            transform: "translateX(0) scale(1)",
          },
        },
        pop_in: {
          "0%": {
            transform: "scale(0.9)",
            opacity: "0",
          },
          "20%": {
            transform: "scale(1.05)",
            opacity: "1",
          },
          "40%": {
            transform: "scale(0.99)",
            opacity: "1",
          },
          "60%": {
            transform: "scale(1.01)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
      },
      fontFamily: {
        sans: ["var(--font-custom)", ...fontFamily.sans],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        highlight: "var(--color-4)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

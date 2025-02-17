/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

document.addEventListener("mouseover", (e) => {
  if (window.innerWidth <= 768) return;
  const card = e.target.closest(".hover-card");
  if (card) {
    handleMouseEnter({ target: card });
  }
});

function rotateToMouse(e) {
  if (window.innerWidth <= 768) return;
  const card = e.currentTarget;
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const bounds = card.getBoundingClientRect();

  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2,
  };
  const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

  card.style.transform = `
    scale3d(1.03, 1.03, 1.03)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
  `;

  const glowElement = card.querySelector(".hover-glow");
  if (glowElement) {
    const color2 = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();

    glowElement.style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width / 2}px
      ${center.y * 2 + bounds.height / 2}px,
      ${hexToRGB(color2, 0.2)},
      #0000000f
    )
  `;
  }
}

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

function handleMouseEnter(e) {
  const card = e.target;
  card.addEventListener("mousemove", rotateToMouse);
  card.addEventListener("mouseleave", handleMouseLeave);
}

function handleMouseLeave(e) {
  const card = e.target;
  card.removeEventListener("mousemove", rotateToMouse);
  card.style.transform = "";
  const glowElement = card.querySelector(".hover-glow");
  if (glowElement) {
    glowElement.style.backgroundImage = "";
  }
}

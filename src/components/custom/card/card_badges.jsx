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

export const CardBadges = ({ badges = [] }) => {
  return (
    <div className="card-badges mb-2">
      {badges.map((badge, index) => (
        <img
          key={index}
          src={badge}
          alt="badge"
          className="mr-2 inline-block"
        />
      ))}
    </div>
  );
};

CardBadges.displayName = "CardBadges";

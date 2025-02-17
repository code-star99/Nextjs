/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import React from "react";

const Footer = ({ config }) => {
  return (
    <footer className="bg-black/10 shadow-xl text-white py-4">
      <div className="container mx-auto text-center">
        {config.footer && (
          <>
            {config.footer.links && (
              <div className="flex justify-center space-x-4 mt-2 mb-2">
                {config.footer.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:scale-110 duration-75 c-cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
            <p className="c-cursor-text">{config.footer.text}</p>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;

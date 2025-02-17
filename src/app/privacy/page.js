/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import config from "/CONFIG.json";

export default function Privacy() {
  const privacy = config.pages.privacy;

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <h1 className="c-cursor-text text-4xl glow uppercase font-bold text-center mb-10">
        {privacy.header}
      </h1>

      <div className="bg-black/50 shadow-md rounded-lg p-8 space-y-6">
        <p className="mb-6">{privacy.content.introduction}</p>

        {privacy.content.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p>{section.description}</p>
            {section.details && (
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                {section.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="mt-8 pt-4 border-t border-gray-700">
          <h3 className="text-xl font-semibold mb-4">
            {privacy.content.contact_title}
          </h3>
          <p>{privacy.content.contact}</p>
        </div>
      </div>
    </div>
  );
}

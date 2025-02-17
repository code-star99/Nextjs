/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

const fs = require("fs").promises;
const path = require("path");

const CURRENT_YEAR = new Date().getFullYear();
const GITHUB_LINK = "https://github.com/max1mde/portfolio";

function createLicenseHeader(year) {
  return `/**
 * Portfolio
 * Copyright (C) ${year} Maxim (${GITHUB_LINK})
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

`;
}

function extractCopyrightYear(content) {
  const yearMatch = content.match(/Copyright \(C\) (\d{4})/);
  return yearMatch ? parseInt(yearMatch[1], 10) : null;
}

function hasLicenseHeader(content, licenseHeader) {
  const stripYear = (header) => {
    return header
      .replace(/Copyright \(C\) \d{4}/, "Copyright (C) YEAR")
      .replace(/\s+/g, "")
      .trim();
  };

  const contentStripped = stripYear(
    content.split("\n").slice(0, 10).join("\n"),
  );
  const headerStripped = stripYear(licenseHeader);

  return contentStripped.includes(headerStripped);
}

async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const existingYear = extractCopyrightYear(content);
    const licenseHeader = createLicenseHeader(CURRENT_YEAR);

    if (!hasLicenseHeader(content, licenseHeader)) {
      if (existingYear && existingYear !== CURRENT_YEAR) {
        const updatedContent = content.replace(
          /Copyright \(C\) \d{4}/,
          `Copyright (C) ${CURRENT_YEAR}`,
        );
        await fs.writeFile(filePath, updatedContent);
        console.log(`Updated copyright year in: ${filePath}`);
      } else {
        await fs.writeFile(filePath, licenseHeader + content);
        console.log(`Added license header to: ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function addLicenseHeaders(dir) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      const skipDirs = ["node_modules", ".next", ".git", "dist", "build"];
      if (!skipDirs.includes(file)) {
        await addLicenseHeaders(fullPath);
      }
    } else if (
      file.endsWith(".js") ||
      file.endsWith(".jsx") ||
      file.endsWith(".ts") ||
      file.endsWith(".tsx")
    ) {
      await processFile(fullPath);
    }
  }
}

addLicenseHeaders(process.cwd())
  .then(() => console.log("License header processing complete"))
  .catch(console.error);

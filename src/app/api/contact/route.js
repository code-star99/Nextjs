/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import { NextResponse } from "next/server";

const requestCounts = new Map();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 30 * 60 * 1000; // 30 Minutes

function getRateLimitKey(ip) {
  return `ratelimit:${ip}`;
}

function checkRateLimit(ip) {
  const key = getRateLimitKey(ip);
  const now = Date.now();

  const requestData = requestCounts.get(key) || {
    count: 0,
    resetTime: now + RATE_LIMIT_WINDOW,
  };

  if (now >= requestData.resetTime) {
    requestData.count = 0;
    requestData.resetTime = now + RATE_LIMIT_WINDOW;
  }

  if (requestData.count >= RATE_LIMIT) {
    return false;
  }

  requestData.count++;
  requestCounts.set(key, requestData);

  return true;
}

export async function POST(req) {
  const ip =
    req.ip ||
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please try again later.",
      },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 },
      );
    }

    /*
    Here you can add your own implementation to process the information from the contact form
    You can use the name, email and message variable from the top
    */

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been sent, but there is no implementation in place to process it, so it will not be read.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error handling form submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}

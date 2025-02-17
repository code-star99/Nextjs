/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */
import { NextResponse } from "next/server";
import configuration from "/CONFIG.json";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(configuration.global.home_route || "/home", req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};

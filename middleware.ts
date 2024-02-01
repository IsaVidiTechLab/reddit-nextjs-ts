import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server' 

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicPath = path === "/login" || path === "/signup";
  const token = req.cookies.get("token")?.value || "";

  if (publicPath && token){
    return NextResponse.redirect(new URL ("/", req.nextUrl))
  }

  if (!publicPath && !token){
    return NextResponse.redirect(new URL ("/login", req.nextUrl))
  }

}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup"
    ]
}
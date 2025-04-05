import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.pathname;

    const IGNORE_PATHS = [
      "/dashboard/game/characterAttributes",
      "/dashboard/game/characterImage",
      "/dashboard/game/spells",
    ];

    const res = NextResponse.next();

    const shouldClearLocalStorage = !IGNORE_PATHS.some((path) =>
      url.startsWith(path)
    );

    if (shouldClearLocalStorage) {
      res.headers.set("x-clear-localstorage", "true");
    }

    return res;
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};

import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req, res, next) {
  const session = await getToken({ req, secret: process.env.NEXT_PUBLIC_AUTH_SECRET })
  const url = req.page
  const login = () => {
    if (!session) {
      let redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/signin"
      return NextResponse.rewrite(redirectUrl)
    }
  }
  const guest = () => {
    if (session) {
      let redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/"
      return NextResponse.rewrite(redirectUrl)
    }
  }
  if (url.name === "/signin") return guest()
  if (url.name === "/signup") return guest()
  if (url.name === "/create") return login()
  if (url.name === "/student/[studentId]") return login()
}

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"
import Cookies from "js-cookie"

const Navbar = () => {
  const { data: session } = useSession()
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Image src={"/favicon.ico"} width={24} height={24} />
          <Link href="/">
            <a className="ms-2 navbar-brand">Student Book</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!session && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => signIn()}>
                      Sign In
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link href={"/signup"}>
                      <a className="nav-link">Sign Up</a>
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link href={"/"}>
                  <a className="nav-link">Home</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"/create"}>
                  <a className="nav-link">Create Student</a>
                </Link>
              </li>
              {session && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {session.user.email}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a
                        className="dropdown-item text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          Cookies.remove("accessToken")
                          signOut({ callbackUrl: `${window.location.origin}/signin` })
                        }}
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

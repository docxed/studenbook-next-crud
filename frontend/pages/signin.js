import React, { useState, useCallback } from "react"
import { useMutation } from "@apollo/client"
import { SIGNIN_MUTATION } from "../graphql/userMutation"
import { isAlert } from "../lib/alert"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { signIn as signInAuth } from "next-auth/react"

const signin = () => {
  const router = useRouter()
  const [signInInput, setSignInInput] = useState({
    email: "",
    password: "",
  })

  const [signIn] = useMutation(SIGNIN_MUTATION)
  const handleSignIn = useCallback(async (e) => {
    e.preventDefault()
    try {
      const res = await signIn({
        variables: {
          email: signInInput.email,
          password: signInInput.password,
        },
      })
      if (res) {
        Cookies.set("accessToken", res.data.signin.accessToken)
        signInAuth("credentials", {
          ...res.data.signin,
          callbackUrl: `${window.location.origin}/`,
        })
      }
    } catch (error) {
      isAlert("error", error.message, null)
      console.log(error)
    }
  })
  return (
    <>
      <div className="h2">Sign In</div>
      <hr />
      <br />
      <br />
      <form onSubmit={handleSignIn} className="form-group col-lg-6 col-md-6 col-sm-12 m-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            onChange={(e) => setSignInInput({ ...signInInput, email: e.target.value })}
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            onChange={(e) => setSignInInput({ ...signInInput, password: e.target.value })}
            name="password"
            type="Password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3 text-center">
          <button className="btn btn-primary" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </>
  )
}

export default signin

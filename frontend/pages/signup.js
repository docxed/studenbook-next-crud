import React, { useState, useCallback } from "react"
import { useMutation } from "@apollo/client"
import { SIGNUP_MUTATION } from "../graphql/userMutation"
import { isConfirm, isAlert } from "../lib/alert"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"

const signup = () => {
  const router = useRouter()
  const [signUpInput, setSignUpInput] = useState({
    email: "",
    fullname: "",
    password: "",
  })

  const [signUp] = useMutation(SIGNUP_MUTATION)
  const handleSignUp = useCallback((e) => {
    e.preventDefault()
    isConfirm("question", "Are you sure you want to sign up?", null, async () => {
      try {
        await signUp({
          variables: {
            email: signUpInput.email,
            fullname: signUpInput.fullname,
            password: signUpInput.password,
          },
        })
        isAlert("success", "User created successfully", null)
        signIn()
      } catch (error) {
        isAlert("error", error.message, null)
        console.log(error)
      }
    })
  })
  return (
    <>
      <div className="h2">Sign Up</div>
      <hr />
      <br />
      <br />
      <form onSubmit={handleSignUp} className="form-group col-lg-6 col-md-6 col-sm-12 m-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            onChange={(e) => setSignUpInput({ ...signUpInput, email: e.target.value })}
            type="email"
            className="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fullname</label>
          <input
            onChange={(e) => setSignUpInput({ ...signUpInput, fullname: e.target.value })}
            type="text"
            className="form-control"
            placeholder="Fullname"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            onChange={(e) => setSignUpInput({ ...signUpInput, password: e.target.value })}
            type="Password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3 text-center">
          <button className="btn btn-success" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </>
  )
}

export default signup

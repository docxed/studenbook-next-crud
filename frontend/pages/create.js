import React, { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { useMutation } from "@apollo/client"
import { STUDENT_MUTATION } from "../graphql/studentMutation"
import { isAlert } from "../lib/alert"
import { useRouter } from "next/router"

const create = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [studentInput, setStudentInput] = useState({
    studentId: "",
    firstname: "",
    lastname: "",
    address: "",
  })

  const [createStudent] = useMutation(STUDENT_MUTATION)
  const handleCreateStudent = useCallback((e) => {
    e.preventDefault()
    try {
      createStudent({
        variables: {
          record: {
            studentId: studentInput.studentId,
            firstname: studentInput.firstname,
            lastname: studentInput.lastname,
            address: studentInput.address,
            createByUserId: session.user._id,
          },
        },
      })
      isAlert("success", "Student created successfully", null)
      router.push("/")
    } catch (error) {
      isAlert("error", "Student creation failed", error)
      console.log(error)
    }
  })

  return (
    <>
      <div className="h2">Create Student</div>
      <hr />
      <br />
      <br />
      <form
        onSubmit={handleCreateStudent}
        className="form-group col-lg-6 col-md-6 col-sm-12 m-auto"
      >
        <div className="mb-3">
          <label className="form-label">Student ID</label>
          <input
            onChange={(e) => setStudentInput({ ...studentInput, studentId: e.target.value })}
            type="text"
            className="form-control"
            placeholder="Student ID"
            required
          />
        </div>
        <div className="mb-3">
          <div className="row g-2">
            <div className="col">
              <label className="form-label">Firstname</label>
              <input
                onChange={(e) => setStudentInput({ ...studentInput, firstname: e.target.value })}
                type="text"
                className="form-control"
                placeholder="Firstname"
                required
              />
            </div>
            <div className="col">
              <label className="form-label">Lastname</label>
              <input
                onChange={(e) => setStudentInput({ ...studentInput, lastname: e.target.value })}
                type="text"
                className="form-control"
                placeholder="Lastname"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            onChange={(e) => setStudentInput({ ...studentInput, address: e.target.value })}
            type="text"
            className="form-control"
            placeholder="Address"
            required
          />
        </div>
        <div className="mb-3 text-center">
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </>
  )
}

export default create

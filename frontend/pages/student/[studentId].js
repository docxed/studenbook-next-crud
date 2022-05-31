import React, { useState, useCallback } from "react"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@apollo/client"
import { STUDENT_QUERY } from "../../graphql/studentQuery"
import { UPDATE_STUDENT_MUTATION } from "../../graphql/studentMutation"
import Loading from "../../components/Loading"
import { isAlert } from "../../lib/alert"

const student = () => {
  const router = useRouter()
  const { studentId } = router.query
  const [studentInput, setStudentInput] = useState({
    studentId: "",
    firstname: "",
    lastname: "",
    address: "",
  })
  const {
    loading,
    error,
    data: resStudent,
    refetch,
  } = useQuery(STUDENT_QUERY, {
    variables: {
      id: studentId,
    },
    skip: !studentId,
    onCompleted: (data) => {
      setStudentInput({
        studentId: data.student.studentId,
        firstname: data.student.firstname,
        lastname: data.student.lastname,
        address: data.student.address,
      })
    },
  })
  const [updateStudent] = useMutation(UPDATE_STUDENT_MUTATION)
  const handleUpdateStudent = useCallback(async (e) => {
    e.preventDefault()
    try {
      await updateStudent({
        variables: {
          id: studentId,
          record: {
            studentId: studentInput.studentId,
            firstname: studentInput.firstname,
            lastname: studentInput.lastname,
            address: studentInput.address,
          },
        },
      })
      isAlert("success", "Student updated successfully", null)
      refetch()
    } catch (error) {
      isAlert("error", "Student update failed", error)
      console.log(error)
    }
  })

  if (loading) return <Loading />
  return (
    <>
      <div className="h2">Student</div>
      <hr />
      <br />
      <br />
      <form
        onSubmit={handleUpdateStudent}
        className="form-group col-lg-6 col-md-6 col-sm-12 m-auto"
      >
        <div className="mb-3">
          <label className="form-label">Student ID</label>
          <input
            defaultValue={studentInput.studentId}
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
                defaultValue={studentInput.firstname}
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
                defaultValue={studentInput.lastname}
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
            defaultValue={studentInput.address}
            onChange={(e) => setStudentInput({ ...studentInput, address: e.target.value })}
            type="text"
            className="form-control"
            placeholder="Address"
            required
          />
        </div>
        <div className="mb-3 text-center">
          <button className="btn btn-info" type="submit">
            Update
          </button>
        </div>
      </form>
    </>
  )
}

export default student

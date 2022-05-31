import React, { useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { useQuery, useMutation } from "@apollo/client"
import { STUDENTS_QUERY } from "../graphql/studentQuery"
import { DELETE_STUDENT_MUTATION } from "../graphql/studentMutation"
import Loading from "../components/Loading"
import { isAlert } from "../lib/alert"
import Link from "next/link"

const index = ({ data }) => {
  useEffect(() => {
    refetch()
  }, [])
  const { data: session } = useSession()
  const { loading, error, data: resStudents, refetch } = useQuery(STUDENTS_QUERY)
  const [deleteStudent] = useMutation(DELETE_STUDENT_MUTATION)
  const handleDeleteStudent = useCallback((id) => {
    try {
      deleteStudent({
        variables: {
          id,
        },
        onCompleted: () => {
          isAlert("success", "Student deleted successfully", null)
          refetch()
        },
      })
    } catch (error) {
      isAlert("error", "Student deletion failed", error)
      console.log(error)
    }
  }, [])
  if (loading) return null
  return (
    <>
      <div className="h2">Students</div>
      <hr />
      <br />
      <br />
      <div className="row">
        {resStudents.students.map((student) => (
          <div key={student._id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card h-100" style={{ borderRadius: 8 }}>
              <div className="card-body">
                <div className="text-end">
                  <div className="dropdown">
                    <button
                      className="btn btn-light dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Settings
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <Link href={"/student/" + student._id}>
                          <a className="dropdown-item">Edit</a>
                        </Link>
                      </li>
                      <li>
                        <a
                          onClick={() => handleDeleteStudent(student._id)}
                          className="dropdown-item text-danger"
                          style={{ cursor: "pointer" }}
                        >
                          Remove
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="h5">
                  {student.firstname} {student.lastname}
                </div>
                <div className="h6">{student.studentId}</div>
                <div className="h6">{student.address}</div>
                <div className="h6">{student.user.email}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default index

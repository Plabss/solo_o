/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import logo from '../../../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const DisplayStudentInformation = () => {
    let { state } = useLocation()
    console.log(state);
    const { studentId, counselorId } = useParams()
    console.log(studentId, counselorId);
    const link = `http://localhost:3000/file-upload/${studentId}/${counselorId}`

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Link copied to clipboard!",
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch((err) => {
                console.error('Failed to copy the link: ', err)
            })
    }

    const [studentDocuments, setStudentDocuments] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/students/${studentId}/${counselorId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('okkkkkkkkkk', data)
                const obj = data.data
                console.log(obj)
                setStudentDocuments(obj)
            })
    }, [])
    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <div className='container my-3'>
            <section>
                <section className="d-flex">
                    <img style={{ width: '150px', height: '50px', marginRight: 50 }} src={logo} alt="Logo" />
                    <h3 className="text-center">{state.item.country}</h3>
                </section>
                <section className="my-5">
                    <section className="d-flex justify-content-between">
                        <p>
                            <b>Entry Date : </b>
                            {state?.item.entryDate}
                        </p>
                    </section>
                    <section>
                        <p>
                            <b>Name : </b> {state.item.fullName}
                        </p>
                        <p>
                            <b>Address : </b>
                            {state.item.street}
                        </p>
                        <p>
                            <b>Contact number : </b>
                            {state.item.phoneNumber}
                        </p>
                    </section>
                </section>
            </section>
            <section>
                <h4>
                    <i>Educational Details</i>
                </h4>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Course Title</th>
                            <th scope="col">Passing Year</th>
                            <th scope="col">Grade/CGPA</th>
                            <th scope="col">Subject/Group</th>
                            <th scope="col">Institute Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">SSC</th>
                            <td>{state.item.passingYear1}</td>
                            <td>{state.item.grade1}</td>
                            <td>{state.item.group1}</td>
                            <td>{state.item.institute1}</td>
                        </tr>
                        <tr>
                            <th scope="row">HSC</th>
                            <td>{state.item.passingYear2}</td>
                            <td>{state.item.grade2}</td>
                            <td>{state.item.group2}</td>
                            <td>{state.item.institute2}</td>
                        </tr>
                        <tr>
                            <th scope="row">Hon's </th>
                            <td>{state.item.passingYear3}</td>
                            <td>{state.item.grade3}</td>
                            <td>{state.item.group3}</td>
                            <td>{state.item.institute3}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <h4>
                    IELT'S
                </h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Reading</th>
                            <th scope="col">Writing</th>
                            <th scope="col">Listening</th>
                            <th scope="col">Speaking</th>
                            <th scope="col">Overall</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{state.item.reading}</td>
                            <td>{state.item.writing}</td>
                            <td>{state.item.listening}</td>
                            <td>{state.item.specking}</td>
                            <td>{state.item.overall}</td>
                        </tr>
                    </tbody>
                </table>
                <div>

                </div>{
                    console.log("jkjsdajf'jaosdjfoa", state.item._id)
                }
            </section>

            <section className="d-flex justify-content-between">
                <button onClick={copyToClipboard} className='btn btn3'>Generate and Copy Link</button>
                <button className='btn btn4'><Link to={link} target='_blank'>Add Documents</Link></button>
                {studentDocuments.length ? (
                    <>
                        {user.employee_id === "1" && (
                            <Link
                                to={`/super-admin/student-documents/${studentId}/${counselorId}`}
                                state={{ sudentsDocuments: studentDocuments[0], stdId: state.item._id, app: state.item.applicant }}
                            >
                                <button className='btn btn2'>See Documents</button>
                            </Link>
                        )}
                        {user.role === "Counselor" && (
                            <Link
                                to={`/counselor/student-documents/${studentId}/${counselorId}`}
                                state={{ sudentsDocuments: studentDocuments[0], stdId: state.item._id, app: state.item.applicant }}
                            >
                                <button className='btn btn2'>See Documents</button>
                            </Link>
                        )}
                        {user.role === "admin Officer" && (
                            <Link
                                to={`/admin-officer/student-documents/${studentId}/${counselorId}`}
                                state={{ sudentsDocuments: studentDocuments[0], stdId: state.item._id, app: state.item.applicant }}
                            >

                                <button className='btn btn2'>See Documents</button>
                            </Link>
                        )}
                        {user.role === "Admin Office Visa Section" && (
                            <Link
                                to={`/visa-process/student-documents/${studentId}/${counselorId}`}
                                state={{ sudentsDocuments: studentDocuments[0], stdId: state.item._id, app: state.item.applicant }}
                            >

                                <button className='btn btn2'>See Documents</button>
                            </Link>
                        )}
                    </>
                ) : (
                    <h3 className='text-danger'>No Documents Submitted</h3>
                )}
            </section>
        </div>
    )
}

export default DisplayStudentInformation

import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import './DocumentDisplay.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import DownloadButton from '../../../components/ZipDownLoaderButton/DownloadButton'

const StudentsDocuments = () => {
  let { state } = useLocation()
  console.log(state)
  const { studentId, counselorId } = useParams()
  const [applicants, setApplicants] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  console.log('applicants', applicants)
  const [applicantList, setApplicantList] = useState(state.app)
  console.log(applicantList)
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-employee-list`)
      .then((res) => res.json())
      .then((data) => {
        let applicantsList = data.data.filter((item) => item.role === 'admin Officer')
        setApplicants(applicantsList)
      })
  }, [])

  const [selectedApplicant, setSelectedApplicant] = useState([])
  const handleApplicants = (e) => {
    const parsedValue = JSON.parse(e.target.value)
    console.log('e', parsedValue)
    setSelectedApplicant(parsedValue)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('selectedApplicant', selectedApplicant.id)
    axios
      .patch(
        `${process.env.REACT_APP_API_BASE_URL}/counselor/assign-student-to-applicant/${state.stdId}/${selectedApplicant.id}`,
        {
          applicant: selectedApplicant,
        },
      )
      .then((response) => {
        console.log(response.data.data)
        setApplicantList(response.data.data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Student Created Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        setIsSubmitted(true)
      })
      .catch((error) => console.error(error))
  }
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(state)
  const { studentId: lol, ssc, hsc, hons, masters, utilities } = state.sudentsDocuments

  const renderImages = (category, documents) => {
    return (
      <>
        <div className='studentsDocuments'>
          <h4 className="text-center">{category.toUpperCase()}</h4>
          <div className="d-flex justify-content-between align-items-center">
            {Object.keys(documents).map((docKey, index) => (
              <div key={index} className="doc-container">
                {documents[docKey] ? (
                  <>
                    <img src={`/studentDocs/${studentId}/${documents[docKey]}`} alt={docKey} />
                    <p className="doc-label text-center">{docKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
                  </>
                ) : (
                  <p className="doc-status">
                    {docKey.replace(/([A-Z])/g, ' $1').toUpperCase()} not submitted
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <section className="my-5 container showDocuments">
      <div>
        {renderImages('S.S.C', ssc)}
        {renderImages('H.S.C', hsc)}
        {renderImages('Hons', hons)}
        {renderImages('Masters', masters)}
        <section>
          <h4 className="text-center">Utilities</h4>
          <div className="d-flex justify-content-around">
            {Object.keys(utilities).map((utilKey, index) => (
              <div key={index} className="doc-container">
                {utilities[utilKey] ? (
                  <>
                    <img src={`/studentDocs/${studentId}/${utilities[utilKey]}`} alt={utilKey} />
                    <p className="doc-label">{utilKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</p>
                  </>
                ) : (
                  <p className="doc-status">
                    {utilKey.replace(/([A-Z])/g, ' $1').toUpperCase()} not submitted
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        <div className="d-flex justify-content-around my-3">
          <DownloadButton folderName={studentId} parentFolderName="studentDocs"/>
        </div>
      </div>

      {console.log('applicantList', applicantList)}
      {applicantList?.length > 1 && (
        <h3 className="text-center p-3 bg-info bg-opacity-10 border border-info border-start-0 rounded-end">
          This Student is Assigned to{' '}
          {applicantList?.map((element) => (
            <p className="text-danger">{element.applicant_name}</p>
          ))}{' '}
          For Application
        </h3>
      )}
      {user.role == 'Super Admin' || user.role == 'Counselor' ? (
        <form onSubmit={handleSubmit}>
          <div className="form-row mt-4">
            <div className="form-group">
              <label htmlFor="counselor">Assign To a Applicant's : </label>
              <select id="applicants" name="applicants" onChange={handleApplicants}>
                <option>Choose One Applicant</option>
                {applicants.map((item) => (
                  <option
                    key={item.employee_id}
                    value={JSON.stringify({
                      id: item._id,
                      applicantId: item.employee_id,
                      applicant_name: item.name,
                    })}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn2" disabled={isSubmitted}>
            Assign
          </button>
        </form>
      ) : (
        ''
      )}

      {user.role === 'admin Officer' && (
        <section className="d-flex">
          <button className="btn btn2 m-auto">
            <Link
              to={`/admin-officer/update-application-status/${studentId}/${counselorId}/${user.employee_id}`}
              state={state.stdId}
            >
              {' '}
              Update Status{' '}
            </Link>
          </button>
        </section>
      )}
      {state.app.length > 1
        ? user.role === 'Super Admin' && (
            <section className="d-flex">
              <button className="btn btn2 m-auto">
                <Link
                  to={`/super-admin/update-application-status/${studentId}/${counselorId}/${state.app[1].applicantId}`}
                  state={state.stdId}
                >
                  {' '}
                  Update Status{' '}
                </Link>
              </button>
            </section>
          )
        : ''}
      {state.app.length > 1
        ? user.role === 'Admin Office Visa Section' && (
            <section className="d-flex">
              <button className="btn btn2 m-auto">
                <Link
                  to={`/visa-process/all-university-documents/${studentId}/${counselorId}/${state.app[1].applicantId}`}
                  state={state.stdId}
                >
                  {' '}
                  Get Documents{' '}
                </Link>
              </button>
            </section>
          )
        : ''}
    </section>
  )
}

export default StudentsDocuments

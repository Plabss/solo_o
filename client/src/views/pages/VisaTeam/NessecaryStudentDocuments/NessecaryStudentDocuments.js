import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './NessecaryStudentDocuments.css'
import visaTeamServices from '../../../../components/httpservices/visaTeamServices/visaTeamServices'
import DownloadButton from '../../../../components/ZipDownLoaderButton/DownloadButton'

const NessecaryStudentDocuments = () => {
  const { studentId, counselorId } = useParams()
  const [docs, setDocs] = useState([])
  const visaTeam = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/visa/get-all-visa-pros-docs/${visaTeam.employee_id}/${studentId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setDocs(data?.data)
      })
  }, [])

  const handleVisaStatusSuccess = async () => {
    const res = await visaTeamServices.updateStatus(studentId, 'success')
  }

  const handleVisaStatusRejected = async () => {
    const res = await visaTeamServices.updateStatus(studentId, 'rejected')
  }

  // const {
  //     offerLetter,
  //     swiftCopy,
  //     universityPaymentRecept,
  //     loa,
  //     dol,
  //     pal,
  //     country,
  //     intake,
  //     note,
  //     subject,
  //     universityName,
  //     visaTeamName, } =

  return (
    <div>
      {console.log('//////////////////////////////////', docs)}
      {docs.length ? (
        <div className="card documents">
          <div className="card-header">
            <h2>Student Information</h2>
          </div>
          <div className="card-body">
            {/* <div className="info-row">
                                <span className="label">Student ID:</span>
                                <span className="value">{studentId}</span>
                            </div> */}
            <div className="info-row">
              <span className="label">Country:</span>
              <span className="value">
                <strong>{docs[0].country}</strong>
              </span>
            </div>
            <div className="info-row">
              <span className="label">Intake:</span>
              <span className="value">
                <strong>{docs[0].intake}</strong>
              </span>
            </div>
            <div className="info-row">
              <span className="label">Note:</span>
              <span className="value">
                <strong>{docs[0].note}</strong>
              </span>
            </div>
            <div className="info-row">
              <span className="label">Subject:</span>
              <span className="value">
                <strong>{docs[0].subject}</strong>
              </span>
            </div>
            <div className="info-row">
              <span className="label">University:</span>
              <span className="value">
                <strong>{docs[0].universityName}</strong>
              </span>
            </div>
            <div className="info-row">
              <span className="label">Visa Team:</span>
              <span className="value">
                <strong>{docs[0].visaTeamName}</strong>
              </span>
            </div>
            {/* <div className="info-row">
                                <span className="label">Counselor ID:</span>
                                <span className="value">{counselorId}</span>
                            </div> */}
            <div className="info-row mb-5">
              <span className="label">Applicant ID:</span>
              <span className="value">
                <strong>{docs[0].applicantId}</strong>
              </span>
            </div>
            <div className="info-row">
              <span className="label">Offer Letter:</span>
              <img
                src={`/UniDoc/${docs[0].studentId}/${docs[0].offerLetter}`}
                alt="Offer Letter"
                className="document"
              />
            </div>
            <div className="info-row">
              <span className="label">Swift Copy:</span>
              <img
                src={`/UniDoc/${docs[0].studentId}/${docs[0].swiftCopy}`}
                alt="Swift Copy"
                className="document"
              />
            </div>
            <div className="info-row">
              <span className="label">University Payment Receipt:</span>
              <img
                src={`/UniDoc/${docs[0].studentId}/${docs[0].universityPaymentRecept}`}
                alt="University Payment Receipt"
                className="document"
              />
            </div>
            <div className="info-row">
              <span className="label">LOA:</span>
              <img
                src={`/UniDoc/${docs[0].studentId}/${docs[0].loa}`}
                alt="LOA"
                className="document"
              />
            </div>
            <div className="info-row">
              <span className="label">DOL:</span>
              <img
                src={`/UniDoc/${docs[0].studentId}/${docs[0].dol}`}
                alt="DOL"
                className="document"
              />
            </div>
            <div className="info-row">
              <span className="label">PAL:</span>
              <img
                src={`/UniDoc/${docs[0].studentId}/${docs[0].pal}`}
                alt="PAL"
                className="document"
              />
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-around my-3">
              <DownloadButton folderName={studentId} parentFolderName="UniDocs" />
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <button className="btn btn2" onClick={handleVisaStatusSuccess}>
              Successful
            </button>
            <button className="btn btn3" onClick={handleVisaStatusRejected}>
              Rejected
            </button>
          </div>
        </div>
      ) : (
        <h2>No Documents</h2>
      )}
    </div>
  )
}

export default NessecaryStudentDocuments

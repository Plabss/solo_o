import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const AssignVisaTeamWithAllDocuments = () => {
  let { state } = useLocation()
  delete state.item._id
  console.log('frontend state   ', state)
  const { studentId, counselorId, applicantId } = useParams()
  const [assignedVisaTeam, setAssignedVisaTeam] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/applicant/get-visa-team/${studentId}/${applicantId}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setAssignedVisaTeam(data.data)
        assignedVisaTeam? setIsSubmitted(true):setIsSubmitted(false)
      })
  }, [])

  const [visaTeam, setVisaTeam] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-employee-list`)
      .then((res) => res.json())
      .then((data) => {
        let VisaTeam = data.data.filter((item) => item.role === 'Admin Office Visa Section')
        setVisaTeam(VisaTeam)
      })
  }, [])

  const [documents, setDocuments] = useState({
    studentId: studentId,
    counselorId: counselorId,
    applicantId: applicantId,
    //uniInfo
    universityName: state.item.universityName,
    country: state.item.country,
    intake: state.item.intake,
    note: state.item.note,
    subject: state.item.subject,
    ///
    offerLetter: '',
    swiftCopy: '',
    universityPaymentRecept: '',
    loa: '',
    dol: '',
    pal: '',
    visaTeam: '',
  })

  const handleChange = (e) => {
    e.preventDefault()

    const { name, files } = e.target
    setDocuments((prevData) => ({
      ...prevData,
      [name]: files[0],
    }))

    console.log('documents', documents)
  }
  const handleVisaTeam = (e) => {
    const parsedValue = JSON.parse(e.target.value)
    console.log('e', parsedValue)

    setDocuments({ ...documents, visaTeam: parsedValue })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('documents From Submit', documents)

    // Object.keys(documents).map((item) => Data.append({item} , documents[item]))

    const Data = new FormData()

    Data.append(`offerLetter`, documents.offerLetter)
    Data.append(`swiftCopy`, documents.swiftCopy)
    Data.append(`universityPaymentRecept`, documents.universityPaymentRecept)
    Data.append(`loa`, documents.loa)
    Data.append(`dol`, documents.dol)
    Data.append(`pal`, documents.pal)
    ////UniInfo
    Data.append(`universityName`, documents.universityName)
    Data.append(`country`, documents.country)
    Data.append(`intake`, documents.intake)
    Data.append(`note`, documents.note)
    Data.append(`subject`, documents.subject)
    // Data.append(`universityInfo`, documents.universityInfo);
    Data.append(`studentId`, documents.studentId)
    Data.append(`counselorId`, documents.counselorId)
    Data.append(`applicantId`, documents.applicantId)
    //visateam
    Data.append(`visaTeamId`, documents.visaTeam.employeeId)
    Data.append(`visaTeamName`, documents.visaTeam.employee_name)

    axios
      .post(
        `http://localhost:8080/api/v1/applicant/upload-all-university-document/${studentId}/${counselorId}/${applicantId}/${state.studentObjectId}`,
        Data,
        { headers: { 'Content-Type': 'multipart/form-data' } },
      )
      .then((result) => {
        console.log('resulttttttttttttttt  :', result)
        if (result) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Student Created Successfully',
            showConfirmButton: false,
            timer: 1500,
          })
          setIsSubmitted(true)
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <div className="form-upload-container">
        
        <form class="container p-y-1" onSubmit={handleSubmit}>
          <h5 className="mt-3 mb-5 text-center">Please Upload All The Documents From University</h5>
          {assignedVisaTeam ? (
            <h4 className="text-center">
              This Student is already assigned to{' '}
              <strong className="text-danger">{assignedVisaTeam}</strong>
            </h4>
          ) : (
            ''
          )}
          <div class="row m-b-1">
            <h6 className="">S.S.C Documents : </h6>
            <div class="col-sm-6 offset-sm-3 forBlue forPaddingMargin">
              <div class="form-group inputDnD ">
                <label for="inputFile">OfferLetter</label>
                <input
                  type="file"
                  class="text-primary"
                  placeholder="Upload Or Drag and drop"
                  name="offerLetter"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">Swift Copy</label>
                <input
                  type="file"
                  class="text-primary font-weight-bold"
                  accept="image/*"
                  data-title="Drag and drop a file"
                  name="swiftCopy"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">University Payment Recept</label>
                <input
                  type="file"
                  class="text-success font-weight-bold"
                  accept="image/*"
                  name="universityPaymentRecept"
                  data-title="Drag and drop a file"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">Letter Of Acceptance</label>
                <input
                  type="file"
                  class="text-success font-weight-bold"
                  accept="image/*"
                  name="loa"
                  data-title="Drag and drop a file"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">Deferred Offer Letter</label>
                <input
                  type="file"
                  class="text-success font-weight-bold"
                  accept="image/*"
                  name="dol"
                  data-title="Drag and drop a file"
                  onChange={handleChange}
                />
              </div>
              <div class="form-group inputDnD">
                <label for="inputFile">I20/ COE'S / PAL</label>
                <input
                  type="file"
                  class="text-success font-weight-bold"
                  accept="image/*"
                  name="pal"
                  data-title="Drag and drop a file"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-row mt-4">
            <div className="form-group">
              <label htmlFor="counselor">VisaTeam Name</label>
              <select id="counselor" name="counselor" onChange={handleVisaTeam}>
                <option>Choose One</option>
                {visaTeam.map((item) => (
                  <option
                    key={item.employee_id}
                    value={JSON.stringify({
                      id: item._id,
                      employeeId: item.employee_id,
                      employee_name: item.name,
                    })}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <section className="my-1 d-flex justify-content-around">
            <button type="submit" className="btn btn2" disabled={isSubmitted}>
              {' '}
              Submit{' '}
            </button>
          </section>
        </form>
      </div>
    </div>
  )
}

export default AssignVisaTeamWithAllDocuments

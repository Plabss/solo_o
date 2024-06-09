/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import SuperAdminServices from '../../../components/httpservices/superAdminServices/SuperAdminServices';
import axios from 'axios';

const CreateEmployee = () => {

  const [isSubmitted, setIsSubmitted] = useState(false)

  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    phone: "",
    profilePic: "",
    email: "",
    familyPhone: "",
    previousExperience: "",
    password: "",
    employee_id: "",
    salary: "",
    role: "",
    cv:"",
    resume: ""
  });
  const [Designation, setDesignation] = useState(["Select Role", "receptionist", "admin Officer", "Software Engineer", "Hr", "Counselor", "Admin Office Visa Section"]);
  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault()

    const Data = new FormData();
    Data.append(`name`, employee.name);
    Data.append(`email`, employee.email);
    Data.append(`password`, employee.password);
    Data.append(`address`, employee.address);
    Data.append(`salary`, employee.salary);
    Data.append(`role`, employee.role);
    Data.append(`previousExperience`, employee.previousExperience);
    Data.append(`familyPhone`, employee.familyPhone);
    Data.append(`phone`, employee.phone);
    Data.append(`employee_id`, employee.employee_id);

    Data.append(`profilePic`, employee.profilePic);
    Data.append(`cv`, employee.cv);
    Data.append(`resume`, employee.resume);


    //const res = await SuperAdminServices.createEmployee(Data);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/super-admin/add-employee`,Data,{
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data)
      navigate('/super-admin/employee/employee-list')
    } catch (error) {
      console.log(error)
    }

    // if (res) {
    //   navigate('/super-admin/employee/employee-list')
    // } else {
    //   alert(res.data.Error)
    // }


    setIsSubmitted(true)


  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <p className="my-4"><b>Current Date And Time</b> : {employee.JoinDate}</p>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Employee Id
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="employee_id"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, employee_id: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Employee Phn
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="phone"
              placeholder="Phone Number"
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="familyPhone" className="form-label">
              Family Phone
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="familyPhone"
              placeholder="Phone Number"
              onChange={(e) =>
                setEmployee({ ...employee, familyPhone: e.target.value })
              }
            />

          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Previous Experience
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="previousExperience"
              placeholder="previous Experience"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, previousExperience: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="role" className="form-label">
              Designation
            </label>
            <select name="role" id="role" className="form-select"
              onChange={(e) => setEmployee({ ...employee, role: e.target.value })}>
              {Designation.map((c,index) => {
                return <option key={index} value={c}>{c}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="profilePic">
              Select Profile
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="profilePic"
              name="profilePic"
              onChange={(e) => setEmployee({ ...employee, profilePic: e.target.files[0] })}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="cv">
              ADD CV
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="cv"
              name="cv"
              onChange={(e) => setEmployee({ ...employee, cv: e.target.files[0] })}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="resume">
              ADD Resume
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="resume"
              name="resume"
              onChange={(e) => setEmployee({ ...employee, resume: e.target.files[0] })}
            />
          </div>
          

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitted}>
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
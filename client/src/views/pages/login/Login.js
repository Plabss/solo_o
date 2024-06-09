/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import axios from "axios";
import './LogIn.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

const Login = () => {
  const [logCredential, setLogCredential] = useState({
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setLogCredential((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("logCredential", logCredential);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("hello", logCredential);
    await axios.post(`http://localhost:8080/api/v1/login`, logCredential)
      .then(function (response) {

        const user = response?.data?.data[0];
        console.log("response", user);
        localStorage.setItem('user', JSON.stringify(user))
        setUser(response?.data?.data[0])
        if (response?.data?.data[0].role === "Counselor") {
          navigate('/counselor/dashboard')
        }
        if (response?.data?.data[0].role === "Super Admin") {
          navigate('/super-admin/dashboard')
        }
        if (response?.data?.data[0].role === "admin Officer") {
          navigate('/admin-officer/dashboard')
        }
        if (response?.data?.data[0].role === "receptionist") {
          navigate('/receptionist/dashboard')
        }
        if (response?.data?.data[0].role === "Admin Office Visa Section") {
          navigate('/visa-process/dashboard')
        }


      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="email" autoComplete="username" name="email" type="email" onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type='submit'>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

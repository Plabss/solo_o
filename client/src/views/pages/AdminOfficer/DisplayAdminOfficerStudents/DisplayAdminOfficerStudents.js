import React, { useEffect, useState } from 'react';
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
    cilPeople,
} from '@coreui/icons';
import { Link } from 'react-router-dom';
// import DisplayCounselorStudents from '../DisplayCounselorStudents/DisplayCounselorStudents';

const DisplayAdminOfficerStudents = ({applicantStudent}) => {
    // console.log("displayStudents",displayStudents);
    const counselor = JSON.parse(localStorage.getItem('user'))
    // const [counselorStudent, setCounselorStudent] = useState([]);
    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_API_BASE_URL}/counselor/${counselor.employee_id}`)
    //         .then((res) => res.json())
    //         .then((data) => setCounselorStudent(data.data[0].students))
            
    // }, [])
    return (
        <div>
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                    <CTableRow className='text-center'>
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                            <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">StudentId</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Name</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Phone No</CTableHeaderCell>
                        {/* <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell> */}
                        <CTableHeaderCell className="bg-body-tertiary">More info</CTableHeaderCell>
                    </CTableRow>
                    {/* {
                        console.log("000000000",applicantStudent.status)
                    } */}
                </CTableHead>
                <CTableBody>

                    {applicantStudent?.map((item, index) => {
                        return (

                            <CTableRow v-for="item in tableItems" key={index} className='text-center'>
                                <CTableDataCell className="text-center">
                                    {console.log(item)}
                                    <div>{index + 1}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.studentId}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.fullName}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <div>{item.phoneNumber}</div>
                                </CTableDataCell>
                                {/* <CTableDataCell>
                                    <div>{item.status}</div>
                                </CTableDataCell> */}
                                <CTableDataCell>
                                    <Link to={`/admin-officer/student-details/${item.studentId}/${item.counselor.employee_id}`} state={{ item: item }}><button className="button btn btn3">More Info</button></Link>
                                </CTableDataCell>
                            </CTableRow>

                        )
                    })}
                </CTableBody>
            </CTable >
        </div>
    );
};

export default DisplayAdminOfficerStudents;
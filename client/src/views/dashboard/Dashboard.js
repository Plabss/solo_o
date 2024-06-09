import React, { useEffect, useState } from 'react'
import {
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cibTwitter,
} from '@coreui/icons'


import WidgetsDropdown from '../widgets/WidgetsDropdown'
import TodaysStudents from '../Students/TodaysStudents/TodaysStudents'

const Dashboard = () => {
  const lol = new Date()
  const date = lol.toISOString().split('T')[0];
  const [filteringDate, setFilteringDate] = useState(date)
  const progressGroupExample3 = [
    { title: 'Facebook', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const [students, setStudents] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-student-list`)
      .then((res) => res.json())
      .then((data) => setStudents(data.data))
  }, [])

  const enrolledStudents = students.filter(student => (student.status === 'enrolled'));
  const FollowUpStudents = students.filter(student => student.status === 'follow-up');
  const ApplicationProcessingStudents = students.filter(student => student.status === 'application-processing');
  const VisaProcessingStudents = students.filter(student => student.status === 'visa-processing');
  const SuccessStudents = students.filter(student => student.status === 'success');

  //Todays Students
  // const getTodayDateISO = () => {
  //   const today = new Date();
  //   // setDate(today.toISOString().split('T')[0]);
  //   // today.setHours(0, 0, 0, 0);
  //   return today.toISOString().split('T')[0];
  // };

  const filterStudentsCreatedToday = (students) => {
    // const todayISO = getTodayDateISO();
    // console.log("todayISO",todayISO);
    return students.filter(student => student.createdAt.startsWith(filteringDate));
  };
  const studentsCreatedToday = filterStudentsCreatedToday(students);
  console.log("studentsCreatedToday", studentsCreatedToday);
  //Todays Students


  const getPreviousDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };



  return (
    <section className='container'>
      <WidgetsDropdown 
        allStudents={students} 
        enrolledStudents={enrolledStudents} 
        FollowUpStudents={FollowUpStudents} 
        ApplicationProcessingStudents={ApplicationProcessingStudents}
        VisaProcessingStudents={VisaProcessingStudents}
        SuccessStudents={SuccessStudents}
        className="mb-4" />

      <br></br>

      <section>
        <h3 className='text-center mb-5'> Students Arrived on {date} </h3>
        <TodaysStudents students={studentsCreatedToday} />
      </section>
      <section className='d-flex align-content-between justify-content-center my-4'>
        <button className='btn btn3' onClick={(filteringDate)=>getPreviousDate(filteringDate)}>Pre</button>
        <button className='btn2 btn'>Next</button>
      </section>
    </section>
  )
}

export default Dashboard;

/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import './CreateStudent.css';
import axios from "axios";
import receptionistServices from '../../../components/httpservices/receptionistServices/receptionistServices';
import Swal from 'sweetalert2';


const CreateStudent = () => {
    const [counselors, setCounselors] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false)
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/super-admin/get-employee-list`)
            .then((res) => res.json())
            .then((data) => {

                let counselorList = data.data.filter(item => item.role === "Counselor")
                setCounselors(counselorList)
            }
            )

    }, [])
    const [formData, setFormData] = useState({
        studentId: "",
        fullName: '',
        email: '',
        phoneNumber: '',
        parentPhone: '',
        dob: '',
        street: '',
        city: '',
        postalCode: '',
        country: 'Bangladesh',
        courseTitle1: '',
        passingYear1: '',
        grade1: '',
        group1: '',
        institute1: '',
        courseTitle2: '',
        passingYear2: '',
        grade2: '',
        group2: '',
        institute2: '',
        courseTitle3: '',
        passingYear3: '',
        grade3: '',
        group3: '',
        institute3: '',
        courseTitle4: '',
        passingYear4: '',
        grade4: '',
        group4: '',
        institute4: '',
        entryDate: '',
        howKnow: '',
        englishProficiency: '',
        reading: '',
        writing: '',
        listening: '',
        specking: '',
        overall: '',
        testDate: '',
        probableDate: '',
        chosenCountryName: '',
        anyCountryRefusal: '',
        universityChoice: '',
        intake: '',
        course: '',
        bankStatement: '',
        bankName: '',
        beforeAppliedAgent: '',
        beforeAppliedUniversity: '',
        counselor: {
            employee_id: '',
            id: ''
        },
        applicant: [{
            id: '',
            applicantId: '',
            applicant_name: ''
        }]
        // generalInfo : {
        //     fullName : '',
        //     email : '',
        //     phoneNumber : '',
        //     parentPhone :'',
        // },



        // address: {
        //     street: '',
        //     city: '',
        //     postalCode: '',
        //     country: '',
        // },
        // educationalQualification: {
        //     edu1: {
        //         courseTitle1: '',
        //         passingYear1: '',
        //         Grade1: '',
        //         group1: '',
        //         institute1: ''
        //     },
        //     edu2: {
        //         CourseTitle2: '',
        //         passingYear2: '',
        //         Grade2: '',
        //         group2: '',
        //         institute2: ''
        //     },
        //     edu3: {
        //         CourseTitle3: '',
        //         passingYear3: '',
        //         Grade3: '',
        //         group3: '',
        //         institute3: ''
        //     },
        //     edu4: {
        //         CourseTitle4: '',
        //         passingYear4: '',
        //         Grade4: '',
        //         group4: '',
        //         institute4: ''
        //     }
        // },








    });

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log("formData", formData);
    };
    const handleCounselor = (e) => {
        e.preventDefault();
        const selectedValue = event.target.value;
        const parsedValue = JSON.parse(selectedValue);
        console.log("Start", parsedValue);
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            counselor: {
                "employee_id": parsedValue.employeeId,
                "employee_name": parsedValue.employee_name,
                "id": parsedValue.id
            },
            status: "follow-up",
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const res = await receptionistServices.createStudent(formData);
        // if (res) {
        //     navigate('student/student-list')
        //   } else {
        //     alert(res.data.Error)
        //   }


        axios.post(`${process.env.REACT_APP_API_BASE_URL}/receptionist/create-student`, formData)
            .then(result => {
                console.log(result);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Student Created Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => console.log(err))
        setIsSubmitted(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="form-container">
                    <h3 className='text-center'>General Information</h3>
                    <hr />
                    <div className="form-box">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="studentId">Student ID</label>
                                <input type="text" id="studentId" name='studentId' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" id="fullName" name='fullName' onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name='email' onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="tel" id="phoneNumber" name='phoneNumber' onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth</label>
                                <input type="date" id="dob" name='dob' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="parentPhone">Parent/Guardian Phone</label>
                                <input type="tel" id="parentPhone" name='parentPhone' onChange={handleChange} />
                                {/* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="street">Street</label>
                                <input type="text" id="street" name='street' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" name='city' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="postalCode">Postal Code</label>
                                <input type="text" id="postalCode" name='postalCode' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country</label>
                                <input type="text" id="country" name='country' onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="entryDate">Student Entry Date</label>
                                <input type="date" id="entryDate" name='entryDate' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="howKnow">How Do You Know About Us?</label>
                                <select id="howKnow" name='howKnow' onChange={handleChange}>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Website">Website</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    {/*Education*/}

                    <section className='forBorder mb-4'>
                        <h2>QUALIFICATION INFORMATIONS</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="courseTitle1">Course Title: SSC / O Level / Dakhil</label>
                                <select id="courseTitle1" name='courseTitle1' onChange={handleChange}>
                                    <option value="chooseone">- Choose One -</option>
                                    <option value="secondary">SSC</option>
                                    <option value="O level">O Level</option>
                                    <option value="Dakhil">Dakhil</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-box">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="passingYear1">Passing Year</label>
                                    <input type="text" id="passingYear1" name='passingYear1' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="grade1">Grade/CGPA</label>
                                    <input type="text" id="grade1" name='grade1' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="group1">Subject /Group</label>
                                    <input type="text" id="group1" name='group1' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="institute1">Institute Name</label>
                                    <input type="text" id="institute1" name='institute1' onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="courseTitle2">Course Title: HSC / A Level / Alim</label>
                                <select id="courseTitle2" name='courseTitle2' onChange={handleChange}>
                                    <option value="chooseone">- Choose One -</option>
                                    <option value="higher">HSC</option>
                                    <option value="alevel">A Level</option>
                                    <option value="alim">Alim</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-box">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="passingYear2">Passing Year</label>
                                    <input type="text" id="passingYear2" name='passingYear2' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="grade2">Grade/CGPA</label>
                                    <input type="text" id="grade2" name='grade2' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="group2">Subject /Group</label>
                                    <input type="text" id="group2" name='group2' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="institute2">Institute Name</label>
                                    <input type="text" id="institute2" name='institute2' onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="courseTitle3">Course Title: `Hon&#39;s` / BBA / BA / BSc</label>
                                <select id="courseTitle3" name='courseTitle3' onChange={handleChange}>
                                    <option value="chooseone">- Choose One -</option>
                                    <option value="bsc">BSC</option>
                                    <option value="ba">BA</option>
                                    <option value="bba">BBA</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-box">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="passingYear3">Passing Year</label>
                                    <input type="text" id="passingYear3" name='passingYear3' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="grade3">Grade/CGPA</label>
                                    <input type="text" id="grade3" name='grade3' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="group3">Subject /Group</label>
                                    <input type="text" id="group3" name='group3' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="institute3">Institute Name</label>
                                    <input type="text" id="institute3" name='institute3' onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="courseTitle4">Course Title: Masters / MBA / MA / MSc</label>
                                <select id="courseTitle4" name='courseTitle4' onChange={handleChange}>
                                    <option value="chooseone">- Choose One -</option>
                                    <option value="msc">MSC</option>
                                    <option value="ma">MA</option>
                                    <option value="mba">MBA</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-box">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="passingYear4">Passing Year</label>
                                    <input type="text" id="passingYear4" name='passingYear4' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="grade4">Grade/CGPA</label>
                                    <input type="text" id="grade4" name='grade4' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="group4">Subject /Group</label>
                                    <input type="text" id="group4" name='group4' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="institute4">Institute Name</label>
                                    <input type="text" id="institute4" name='institute4' onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*Education*/}



                    {/*ENGLISH PROFICIENCY*/}

                    <div className="form-box forBorder">
                        <h2>ENGLISH PROFICIENCY</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="englishProficiency">Test Name</label>
                                <select id="englishProficiency" name='englishProficiency' onChange={handleChange}>
                                    <option value="chooseone">- Choose One -</option>
                                    <option value="ielts">IELTS</option>
                                    <option value="duo">Duolingo</option>
                                    <option value="pte">PTE</option>
                                    <option value="tofel">TOFEL</option>
                                    <option value="oietc">OIETC</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="overall">Overall Score</label>
                                <select id="overall" name='overall' onChange={handleChange}>
                                    <option value="chooseone">- Choose One -</option>
                                    <option value="4">4</option>
                                    <option value="4.5">4.5</option>
                                    <option value="5">5</option>
                                    <option value="5.5">5.5</option>
                                    <option value="6">6</option>
                                    <option value="6.5">6.5</option>
                                    <option value="7">7</option>
                                    <option value="7.5">7.5</option>
                                    <option value="8">8</option>
                                    <option value="8.5">8.5</option>
                                    <option value="9">9</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="testDate">Test Date</label>
                                <input type="date" id="testDate" name='testDate' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="probableDate">If not then Probable Date</label>
                                <input type="date" id="probableDate" name='probableDate' onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-box">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="reading">Reading</label>
                                    <select id="reading" name='reading' onChange={handleChange}>
                                        <option value="chooseone">- Choose One -</option>
                                        <option value="4">4</option>
                                        <option value="4.5">4.5</option>
                                        <option value="5">5</option>
                                        <option value="5.5">5.5</option>
                                        <option value="6">6</option>
                                        <option value="6.5">6.5</option>
                                        <option value="7">7</option>
                                        <option value="7.5">7.5</option>
                                        <option value="8">8</option>
                                        <option value="8.5">8.5</option>
                                        <option value="9">9</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="writing">Writing</label>
                                    <select id="writing" name='writing' onChange={handleChange}>
                                        <option value="chooseone">- Choose One -</option>
                                        <option value="4">4</option>
                                        <option value="4.5">4.5</option>
                                        <option value="5">5</option>
                                        <option value="5.5">5.5</option>
                                        <option value="6">6</option>
                                        <option value="6.5">6.5</option>
                                        <option value="7">7</option>
                                        <option value="7.5">7.5</option>
                                        <option value="8">8</option>
                                        <option value="8.5">8.5</option>
                                        <option value="9">9</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="listening">Listening</label>
                                    <select id="listening" name='listening' onChange={handleChange}>
                                        <option value="chooseone">- Choose One -</option>
                                        <option value="4">4</option>
                                        <option value="4.5">4.5</option>
                                        <option value="5">5</option>
                                        <option value="5.5">5.5</option>
                                        <option value="6">6</option>
                                        <option value="6.5">6.5</option>
                                        <option value="7">7</option>
                                        <option value="7.5">7.5</option>
                                        <option value="8">8</option>
                                        <option value="8.5">8.5</option>
                                        <option value="9">9</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="specking">Specking</label>
                                    <select id="specking" name='specking' onChange={handleChange} >
                                        <option value="chooseone">- Choose One -</option>
                                        <option value="4">4</option>
                                        <option value="4.5">4.5</option>
                                        <option value="5">5</option>
                                        <option value="5.5">5.5</option>
                                        <option value="6">6</option>
                                        <option value="6.5">6.5</option>
                                        <option value="7">7</option>
                                        <option value="7.5">7.5</option>
                                        <option value="8">8</option>
                                        <option value="8.5">8.5</option>
                                        <option value="9">9</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*Other Informations */}
                    <section className='forBorder'>
                        <h2>OTHER INFORMATIONS</h2>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="chosenCountryName">Chosen Country Name</label>
                                <input type="text" id="chosenCountryName" name='chosenCountryName' onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="anyCountryRefusal">Any Country Refusal</label>
                                <select id="anyCountryRefusal" name='anyCountryRefusal' onChange={handleChange}>
                                    <option value="chooseone">- Choose One -</option>
                                    <option value="yes">YES</option>
                                    <option value="no">NO</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-box">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="universityChoice">University Choice</label>
                                    <input type="text" id="universityChoice" name='universityChoice' onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="intake">Intake</label>
                                    <input type="text" id="intake" name='intake' onChange={handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="course">Subject / Course</label>
                                    <input type="text" id="course" name='course' onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="bankStatement">Bank Sponsor</label>
                                <input type="text" id="bankStatement" name='bankStatement' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bankName">Bank Name</label>
                                <input type="text" id="bankName" name='bankName' onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="beforeAppliedAgent">Before Applied Agent</label>
                                <input type="text" id="beforeAppliedAgent" name='beforeAppliedAgent' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="beforeAppliedUniversity">Before Applied University</label>
                                <input type="text" id="beforeAppliedUniversity" name='beforeAppliedUniversity' onChange={handleChange} />
                            </div>
                        </div>
                    </section>
                    <div className="form-row mt-4">
                        <div className="form-group">

                            <label htmlFor="counselor">Cunselor Name</label>
                            <select id="counselor" name='counselor' onChange={handleCounselor}>
                                <option>Choose One Counselor</option>
                                {counselors.map((item) => (
                                    <option
                                        key={item.employee_id}
                                        value={JSON.stringify({ id: item._id, employeeId: item.employee_id, employee_name: item.name })}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>



                    {/* Submit button */}
                    <button type="submit" className="submit-btn" disabled={isSubmitted}>Submit</button>


                </div>

            </div>
        </form>
    );
};

export default CreateStudent;




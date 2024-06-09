import React, { useState, useEffect, useCallback } from 'react';
import fakeData from '../../../assets/Fakedata/universityData.json';
import ReactPaginate from 'react-paginate';


const UniversityList = () => {
    const [data, setData] = useState(fakeData);
    const [filteredData, setFilteredData] = useState([]);
    const [country, setCountry] = useState('');
    const [course, setCourse] = useState('');
    const [intake, setIntake] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const filterData = useCallback(() => {
        let filtered = [...data];

        if (country) {
            filtered = filtered.filter(uni => uni.country.toLowerCase() === country.toLowerCase());
        }

        if (course) {
            filtered = filtered.filter(uni => uni.courses.some(c => c.toLowerCase() === course.toLowerCase()));
        }

        if (intake) {
            filtered = filtered.filter(uni => uni.intakes.some(i => i.toLowerCase() === intake.toLowerCase()));
        }

        setFilteredData(filtered);
    }, [country, course, intake, data]);

    useEffect(() => {
        filterData();
    }, [country, course, intake, filterData]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };


    const [pageNumber, setPageNumber] = useState(0);
    const papersPerPage = 10;
    const paperVisited = pageNumber * papersPerPage;
    const paginatePaper = filteredData.slice(paperVisited, paperVisited + papersPerPage);


    const pageCount = Math.ceil(filteredData.length / papersPerPage);
    const handlePageClick = ({ selected }) => {
        setPageNumber(selected);
    }

    return (
        <div className='container'>
            <h1>Filter Universities</h1>
            <div>
                <label>Country:</label>
                <input type="text" value={country} onChange={handleInputChange(setCountry)} />
            </div>
            <div>
                <label>Course:</label>
                <input type="text" value={course} onChange={handleInputChange(setCourse)} />
            </div>
            <div>
                <label>Intake:</label>
                <input type="text" value={intake} onChange={handleInputChange(setIntake)} />
            </div>
            {loading ? (
                <h1 className='text-center'>Loading...</h1>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2>Results:</h2>


                    {filteredData.length > 0 ? (
                        <section>
                            <ul>
                                {paginatePaper.map((uni, index) => (
                                    <div className='card' key={index}>
                                        <h3>{uni.name}</h3>
                                        <p><strong>Country:</strong> {uni.country}</p>
                                        <p><strong>Location:</strong> {uni.location || 'NA'}</p>
                                        <p><strong>Courses:</strong> {uni.courses ? uni.courses.join(', ') : 'NA'}</p>
                                        <p><strong>Intakes:</strong> {uni.intakes ? uni.intakes.join(', ') : 'NA'}</p>
                                        <p><strong>Semester Fee:</strong> {uni.semesterFee || 'NA'}</p>
                                        <p><strong>Course Period:</strong> {uni.coursePeriod || 'NA'}</p>
                                        <p><strong>Scholarship:</strong> {uni.scholarship || 'NA'}</p>
                                    </div>
                                ))}
                            </ul>
                            <div className='ul-center my-3'>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="NEXT >>"
                                    onPageChange={handlePageClick}
                                    pageCount={pageCount}
                                    previousLabel="<< previous"
                                    containerClassName={"paginationBtn"}
                                    previousLinkClassName={"PreviousBtn"}
                                    nextLinkClassName={"nextBtn"}
                                    disabledClassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}

                                />
                            </div>
                        </section>
                    ) : (
                        <p>No universities found.</p>
                    )}
                </div>
            )}
        </div>
    );
};




export default UniversityList;
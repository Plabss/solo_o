/* eslint-disable prettier/prettier */
import React from 'react';
import { useLocation } from 'react-router-dom';
import './EmployeeDetails.css';
import DownloadButton from '../../../components/ZipDownLoaderButton/DownloadButton';

const EmployeeDetails = () => {
    let { state } = useLocation();

    return (
        <div>
            {
                console.log(state)
            }
            
            <div className="about-wrapper">
                <div className="about-left">
                    <div className="about-left-content">
                        <div>
                            <div className="shadow">
                                <div className="about-img">
                                    <img src={`/${state.item.profilePic} `} alt="about image" />
                                </div>
                            </div>

                            <h2 className='text-center'>{state.item.name}</h2>
                            <h3>{state.item.role}</h3>
                        </div>

                        <ul className="icons">
                            <li><i className="fab fa-facebook-f"></i></li>
                            <li><i className="fab fa-twitter"></i></li>
                            <li><i className="fab fa-linkedin"></i></li>
                            <li><i className="fab fa-instagram"></i></li>
                        </ul>
                    </div>

                </div>

                <div className="about-right">
                    <h1>Hello<span>!</span></h1>
                    <h2>Here who I am & what I do</h2>
                    <div className="about-btns">
                        <button type="button" className="btn btn-pink">resume / CV</button>
                        <button type="button" className="btn btn-white">Git hub</button>
                    </div>

                    <div className="about-para">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, aspernatur possimus ullam quaerat, laboriosam ex voluptate aliquid laborum, obcaecati ratione accusamus! Ea nisi modi dolor nam numquam? Temporibus, molestias amet.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus iure tempora alias laudantium sapiente impedit!</p>
                    </div>
                    <div className="credit">Made with <span style={{color:"tomato"}}>❤</span> by <a href="https://www.learningrobo.com/">Learning Robo</a></div>
                </div>
                {
                    console.log(state.item.employee_id)
                }

            </div>

            <div>
                <DownloadButton employee_id={state.item.employee_id} className="btn btn2"></DownloadButton>
            </div>

        </div>
    );
};

export default EmployeeDetails;
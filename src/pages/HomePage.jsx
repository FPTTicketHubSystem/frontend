import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import '../../assets/css/header.css';
import Header from '../component/Header';
import Footer from '../component/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from 'react';
import videoBg from '../assets/css/Thumel.mp4';
import '../assets/css/header.css';
import '../assets/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function HomePage() {

    const navigate = useNavigate();

    const { user, token, onSetUser, onSetRender } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.clear();
        onSetUser({
            data: "",
            token: "",
        })
        onSetRender();
        navigate("/login");
        toast.success('Đã đăng xuất!');
    };


    return (
        <>
            <Header/>
            <section class="hero-section" id="section_1">
                <div class="section-overlay"></div>

                <div class="container d-flex justify-content-center align-items-center">
                    <div class="row">

                        <div class="col-12 mt-auto mb-5 text-center">
                            <small>FPT University Da Nang</small>

                            <h1 class="text-white mb-5">FUDA MUSIC SHOW 2024</h1>

                            <a class="btn custom-btn smoothscroll" href="#section_2">Buy Ticket</a>
                        </div>

                        <div class="col-lg-12 col-12 mt-auto d-flex flex-column flex-lg-row text-center">
                            <div class="date-wrap">
                                <h5 class="text-white">
                                    <i class="custom-icon bi-clock me-2"></i>
                                    22<sup>th</sup>, August 2024
                                </h5>
                            </div>

                            <div class="location-wrap mx-auto py-3 py-lg-0">
                                <h5 class="text-white">
                                    <i class="custom-icon bi-geo-alt me-2"></i>
                                    FPTU Danang Campus, Danang City
                                </h5>
                            </div>

                            <div class="date-wrap">
                                <h5 class="text-white">
                                    <i class="custom-icon bi-clock me-2"></i>
                                    22<sup>th</sup>, August 2024
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                <video autoPlay playsInline loop muted className="custom-video" poster="">
                    <source src={videoBg} type="video/mp4" />
                </video>


            </section>



            <Footer/>
        </>
    );
}

export default HomePage;

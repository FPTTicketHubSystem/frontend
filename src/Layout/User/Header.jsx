// import 'bootstrap/dist/css/bootstrap.css';
import videoBg from '../../Assets/css/Thumel.mp4';
// import '../../Assets/css/header.css';
// import '../../Assets/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    return (
        <>
        <div className='sticky-top mt-0'>
        <nav class="navbar navbar-expand-lg pt-0 pb-0">
            <div class="container">
                <a class="navbar-brand text-white" href="index.html">
                    FPTTicketHub.com
                </a>

                <a href="ticket.html" class="btn custom-btn d-lg-none ms-auto me-4">Login</a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                        <li class="nav-item">
                            <a class="nav-link click-scroll" href="#section_1">Home</a>
                        </li> 

                        <li class="nav-item">
                            <a class="nav-link click-scroll" href="#section_2">Entertainment</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll" href="#section_3">Education</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll" href="#section_4">Workshop</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll" href="#section_5">Sport</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll" href="#section_6">Commemorative</a>
                        </li>
                    </ul>
                    <a href="" class="btn custom-btn d-lg-block d-none ">Sign in</a>
                </div>
            </div>
        </nav>
        </div>
        
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

        </>
    )
}
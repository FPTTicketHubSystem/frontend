import React from "react";
//import "bootstrap/dist/css/bootstrap.css";
//import '../../assets/css/header.css';
import Header from "../component/Header";
import Footer from "../component/Footer";
import "bootstrap/dist/css/bootstrap.css";
import { useContext } from "react";
import videoBg from "../assets/css/Thumel.mp4";
import "../assets/css/header.css";
//import "../assets/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/bootstrap-icons.css";
import imageBg from "../assets/images/events/poster1.png";

function HomePage() {
  const navigate = useNavigate();

  const { user, token, onSetUser, onSetRender } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.clear();
    onSetUser({
      data: "",
      token: "",
    });
    onSetRender();
    navigate("/login");
    toast.success("Đã đăng xuất!");
  };

  return (
    <>
      <Header />
      <section class="hero-section" id="section_1">
        <div class="section-overlay"></div>

        <div class="container d-flex justify-content-center align-items-center">
          <div class="row">
            <div class="col-12 mt-2 mb-5 text-center">
              <small>FPT University Da Nang</small>

              <h1 className="text-white mb-5 display-1 fw-bold">
                FUDA MUSIC SHOW 2024
              </h1>

              <a class="btn custom-btn smoothscroll" href="#section_2">
                Xem chi tiết
              </a>
              
            </div>

            <div class="col-lg-12 col-12 mt-8 d-flex flex-column flex-lg-row text-center">
              <div class="date-wrap">
                <h5 class="text-white">
                  <i class="custom-icon bi-clock me-2"></i>
                  Ngày 22, Tháng 08, 2024
                </h5>
              </div>

              <div class="location-wrap mx-auto py-3 py-lg-0">
                <h5 class="text-white">
                  <i class="custom-icon bi-geo-alt me-2"></i>
                  Đại Học FPT Đà Nẵng
                </h5>
              </div>

              <div class="date-wrap">
                <h5 class="text-white">
                  <i class="custom-icon bi-ticket-perforated me-2"></i>
                  Miễn phí
                </h5>
              </div>
            </div>
          </div>
        </div>
        {/* <video
          autoPlay
          playsInline
          loop
          muted
          className="custom-video"
          poster=""
        >
          <source src={videoBg} type="video/mp4" />
        </video> */}
        <img src={imageBg} className="custom-video" alt="imageBg" />
      </section>
      
      <section class="event spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title">
                <h2>Upcoming Events</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="event__item">
                <div class="event__item__pic set-bg" data-setbg="">
                  <div class="tag-date">
                    <span>Dec 15, 2019</span>
                  </div>
                </div>
                <div class="event__item__text">
                  <h4>David Guetta Miami Ultra</h4>
                  <p>
                    <i class="fa fa-map-marker"></i> Funkhaus Berlin, Berlin,
                    Germany
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="event__item">
                <div class="event__item__pic set-bg" data-setbg="">
                  <div class="tag-date">
                    <span>Dec 15, 2019</span>
                  </div>
                </div>
                <div class="event__item__text">
                  <h4>David Guetta Miami Ultra</h4>
                  <p>
                    <i class="fa fa-map-marker"></i> Funkhaus Berlin, Berlin,
                    Germany
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="event__item">
                <div
                  class="event__item__pic set-bg"
                  data-setbg="img/events/event-3.jpg"
                >
                  <div class="tag-date">
                    <span>Dec 15, 2019</span>
                  </div>
                </div>
                <div class="event__item__text">
                  <h4>David Guetta Miami Ultra</h4>
                  <p>
                    <i class="fa fa-map-marker"></i> Funkhaus Berlin, Berlin,
                    Germany
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="event__item">
                <div
                  class="event__item__pic set-bg"
                  data-setbg="img/events/event-2.jpg"
                >
                  <div class="tag-date">
                    <span>Dec 15, 2019</span>
                  </div>
                </div>
                <div class="event__item__text">
                  <h4>David Guetta Miami Ultra</h4>
                  <p>
                    <i class="fa fa-map-marker"></i> Funkhaus Berlin, Berlin,
                    Germany
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;

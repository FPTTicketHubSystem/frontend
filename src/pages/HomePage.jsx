import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Upcoming from "./Home/UpComing";
import EventByCategory from "./Home/EventByCategory";
import "bootstrap/dist/css/bootstrap.css";
import { useContext } from "react";
import videoBg from "../assets/css/Thumel.mp4";
import "../assets/css/header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/bootstrap-icons.css";
import Forum from "./Home/Forum";
import News from "./Home/News";
import "../assets/css/ticket.css";

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

        <div
          class="container d-flex flex-column justify-content-center align-items-center"
          style={{ paddingTop: "128px" }}
        >
          <div class="col-12 mt-15 mb-15 text-center">
          <small>NỀN TẢNG CUNG CẤP VÉ SỰ KIỆN ĐẠI HỌC FPT ĐÀ NẴNG</small> <br/>
            <h1 className="text-white mb-5 display-1 fw-bold">
              FPT TICKETHUB
            </h1>
            <small>Trở thành ban tổ chức</small> <br/>

            <a class="btn custom-btn smoothscroll" href="#section_2">
                TẠO SỰ KIỆN
            </a>
          </div>

          {/* <div
            class="col-lg-12 col-12 d-flex flex-column flex-lg-row text-center"
            style={{ paddingTop: "120px" }}
          >
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
          </div> */}
        </div>
        <video
          autoPlay
          playsInline
          loop
          muted
          className="custom-video"
          poster=""
        >
          <source src={videoBg} type="video/mp4" />
        </video>
      </section>

      <div className="container main w-100">
        <Upcoming />
        <EventByCategory />
        <EventByCategory />
        <EventByCategory />
      </div>
      <News />

      

      <Footer />
    </>
  );
}

export default HomePage;

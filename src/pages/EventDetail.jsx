import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

const EventDetail = ({ image, title, price, date }) => {
  return (
    <>
      <Header />
      <div className="ticket-background">
        <div className="ticket-wrapper">
          <div className="ticket-content">
            <div className="text">
              <div className="info mb-5">
                <p className="title h5 text-white mt-4 mb-5">
                  FUDA MUSIC SHOW 2024 FUDA MUSIC SHOW 2024 FUDA MUSIC SHOW 2024
                </p>
                <p className="date">
                  <i className="bi bi-calendar3 me-2"></i> 18:00 - 22:00, 11
                  Tháng 06, 2024
                </p>
                <p className="location">
                  <i className="bi bi-geo-alt me-2"></i> Đại Học FPT Đà Nẵng
                </p>
                <p className="address text-white">
                  Khu Đô Thị FPT Đà Nẵng, Phường Hòa Hải, Quận Ngũ Hành Sơn, TP. Đà Nẵng
                </p>
              </div>
              <div className="price mt-5">
                <div id="ticket-price" className="d-flex align-items-center">
                  <span className="me-2 h5 text-white">Giá từ</span>
                  <span href="#ticket-info" className="price-value">
                    10.000đ
                  </span>
                </div>
                <div className="btn mt-2" id="buy-btn">
                <a href="#buy" className="text-white" style={{textDecoration:'none'}}>
                  Mua vé Ngay{" "}
                </a>
                </div>
                
              </div>
            </div>
          </div>
          <div className="ticket-image">
            <img
              src="https://i.ytimg.com/vi/Ymzptp_YU9g/maxresdefault.jpg"
              alt="Banner cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;

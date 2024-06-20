import React from "react";
import { useState, useEffect } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useParams } from "react-router-dom";
import { decodeId } from "../utils/utils";
import { GetEventByIdService } from "../services/EventService";

function EventDetail() {
  const [isAboutCollapsed, setIsAboutCollapsed] = useState(true);
  const [isTicketCollapsed, setIsTicketCollapsed] = useState(false);
  const [event, setEvent] = useState([]);
  const { encodedId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventId = decodeId(encodedId);
      if (eventId) {
        try {
          const response = await GetEventByIdService(eventId);
          if (response) {
            setEvent(response);
          }
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      }
    };

    fetchEvent();
  }, [encodedId]); 

  // const ticketList = [
  //   { type: "GA 1", price: "50.000 đ" },
  //   { type: "GA 2", price: "100.000 đ" },
  //   { type: "VIP", price: "200.000 đ" },
  //   { type: "V.VIP", price: "300.000 đ" },
  // ];

  const ticketList = event?.tickettypes?.map((ticket) => ({
    type: ticket.typeName,
    price: ticket.price,
    quantity: ticket.quantity
  })) || [];

  // xử lý so sánh ngày
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const getDateTimeDisplay = (startTime, endTime) => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (startDate.toDateString() === endDate.toDateString()) {
      return `${formatTime(startTime)} - ${formatTime(endTime)}, ${formatDate(startTime)}`;
    } else {
      return `${formatTime(startTime)}, ${formatDate(startTime)} - ${formatTime(endTime)}, ${formatDate(endTime)}`;
    }
  };

  //xử lý giá tiền
  const getLowestTicketPrice = (tickettypes) => {
    if (!tickettypes || tickettypes.length === 0) return "Miễn phí";
    const prices = tickettypes.map(ticket => ticket.price);
    const lowestPrice = Math.min(...prices);
    return lowestPrice === 0 ? "Miễn phí" : lowestPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  //xử lý chuyển trạng thái và text cho nút đặt vé



  return (
    <>
      <Header />
      <div className="ticket-background">
        <div className="ticket-wrapper">
          <div className="ticket-content">
            <div className="text">
              <div className="info mb-5">
                <p className="title h5 text-white mt-4 mb-5">
                  {event.eventName}
                </p>
                <p className="date">
                  <i className="bi bi-calendar3 me-2"></i>{getDateTimeDisplay(event.startTime, event.endTime)}
                </p>
                <p className="location">
                  <i className="bi bi-geo-alt me-2"></i> {event.location}
                </p>
                <p className="address text-white">
                  {event.address}
                </p>
              </div>
              <div className="price mt-5">
                <div id="ticket-price" className="d-flex align-items-center">
                  <span className="me-2 h5 text-white">Giá từ</span>
                  <span href="#ticket-info" className="price-value">
                  {getLowestTicketPrice(event.tickettypes)}
                  </span>
                </div>
                <div className="btn mt-2" id="buy-btn">
                  <a
                    href="#buy"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Đặt vé ngay{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="ticket-image">
            <img
              src={event.themeImage}
              alt="Banner cover"
            />
          </div>
        </div>
      </div>

      <div className="ticket-event-page">
        <div className="left-part">
          <div className={"card" + (isAboutCollapsed ? " collapsed" : "")}>
            <div className="card-header">Giới thiệu</div>
            <div className="about-content">
              <div dangerouslySetInnerHTML={{__html: event.eventDescription}} />
            </div>
            {isAboutCollapsed ? (
              <>
                <button
                  className="collapsed-button"
                  onClick={() => setIsAboutCollapsed(false)}
                >
                  <i class="bi bi-chevron-down"></i>
                </button>
                <div className="gradient-bg"></div>
              </>
            ) : (
              <button
                className="collapsed-button"
                onClick={() => setIsAboutCollapsed(true)}
              >
                <i class="bi bi-chevron-up"></i>
              </button>
            )}
          </div>
          <div className="card dark">
            <div className="card-header">Thông tin vé</div>
            <div
              className={
                "ticket-info-collapse-header" +
                (isTicketCollapsed ? " collapsed" : "")
              }
              onClick={() => setIsTicketCollapsed((prev) => !prev)}
            >
              <div className="event-time">
                <div>
                  <button>
                    <i class="bi bi-chevron-right"></i>
                  </button>
                  <span>{getDateTimeDisplay(event.startTime, event.endTime)}</span>
                </div>

                <button className="book-button">Đặt vé ngay</button>
              </div>
            </div>
            <div
              className={
                "ticket-info-collapse-content" +
                (isTicketCollapsed ? " collapsed" : "")
              }
            >
              {ticketList.map((ticket) => (
                <div className="ticket-level" key={ticket.type}>
                  <span className="name">{ticket.type}</span>
                  <div>
                  {ticket.price === 0 ? (
                    <span className="price text-center">Miễn phí</span>
                  ) : (
                    <span className="price text-center">{ticket.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                  )}
                  {ticket.quantity === 0 ? (
              <button className="sold-out-button">Hết vé</button>
            ) : (
              <></>
            )}
                  </div>

                </div>
              ))}
            </div>
          </div>
          <div className="card ">
            <div className="card-header">Ban tổ chức</div>
            <div className="organizer-content mb-4">
              <img
                src={event.avatar}
                alt=""
              />
              <div>
                <div className="name">{event.fullName}</div>
                <div className="founding">
                  Ngày thành lập: {new Date(event.birthDay).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Trở thành giám sát viên</div>
            <div className="staff-content mb-2">
              <div>Bạn muốn trở thành giám sát viên cho sự kiện này?</div>
              <button
                className="register-button text-white"
                style={{
                  backgroundColor: "#EC6C21",
                  width: "175px",
                  lineHeight: "34px",
                  borderRadius: "6px",
                }}
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
        <div className="right-part">
          <img className="forum mb-3"
            src="https://daihoc.fpt.edu.vn/wp-content/uploads/2021/04/Poster-FTS2021-Toan-quoc-V1.1.jpg"
            alt=""
          />
                                  <div class="social-share">
                            <ul class="social-icon d-flex align-items-center justify-content-center">
                                <span class="text-black me-3">Chia sẻ:</span>

                                <li class="social-icon-item">
                                    <a href="#" class="social-icon-link">
                                        <span class="bi-facebook"></span>
                                    </a>
                                </li>

                            </ul>
                        </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EventDetail;

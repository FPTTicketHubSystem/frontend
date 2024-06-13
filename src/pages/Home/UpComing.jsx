import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Upcoming() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    const data = [
        {
            dataTime: 'Ngày 15 Tháng 8, 2024',
            nameEvent: 'Big Open Day',
            address: 'FPT University',
            image: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2020/06/7a190960faa807f65eb9-663x900.jpg',
        },
        {
            dataTime: 'Ngày 15 Tháng 8, 2024',
            nameEvent: 'Fuda Rest 2024',
            address: 'FPT University',
            image: 'https://phuongnamevent.vn/datafiles/3/images/1705053948_5999_FUDA-Fest-2024.jpg',
        },
        {
            dataTime: 'Ngày 15 Tháng 8, 2024',
            nameEvent: 'Fuda Music Talent',
            address: 'FPT University',
            image: 'https://newsmd2fr.keeng.vn/tiin/archive/imageslead/2022/06/08/90_9ca7837083ca7cf05f34a9af50141f0b.jpg',
        },
        {
            dataTime: 'Ngày 15 Tháng 8, 2024',
            nameEvent: 'Last Day In Fuda',
            address: 'FPT University',
            image: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2022/05/Poster-Binz-Gonzo-Revised-PNG-min-1-720x900.png',
        }
    ]
    return (
        <>
            <section class="event spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-title mt-5 mb-3">
                                <h2 style={{color: "white", marginLeft: "7px"}}>Upcoming Events</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <Slider {...settings}>
                            {data.map((d) => (                               
                                <div class="col-lg-4 col-sm-10" style={{ margin: "0 10px" }}>
                                    <div class="event__item" style={{background: "white"}}>
                                        <div class="event__item__pic set-bg" style={{ backgroundImage: `url(${d.image})` }}>
                                            <div class="tag-date">
                                                <span>{d.dataTime}</span>
                                            </div>
                                        </div>
                                        <div class="event__item__text">
                                            <h4>{d.nameEvent}</h4>
                                            <p>
                                            <i class="custom-icon bi-geo-alt me-2"></i>
                                                {d.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Upcoming;
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";


function EventByCategory() {
    const events = [
        {
          image: 'https://dnuni.fpt.edu.vn/wp-content/uploads/2022/05/Thumnails-16x9-PNG-min.png',
          title: 'BIG OPEN DAY',
          price: '50.000',
          date: '19 tháng 08, 2024',
        },
        {
          image: 'https://i.ytimg.com/vi/g-mBrs2MDoE/maxresdefault.jpg',
          title: 'OPEN MIC',
          price: '100.000',
          date: '15 tháng 06, 2024',
        },
        {
          image: 'https://btmedia.vn/wp-content/uploads/2021/12/fuda-music-show-1.jpg',
          title: 'FPT TALENT 2024',
          price: '10.000',
          date: '06 tháng 07, 2024',
        },
        {
          image: 'https://btmedia.vn/wp-content/uploads/2021/12/fuda-music-show-1.jpg',
          title: 'MINISHOW NYS CLUB',
          price: '50.000',
          date: '28 tháng 07, 2024',
        },
      ];
    return (
      <>
        <div className="app">
          <h1 style={{color: "white", marginLeft: "15px"}}>Nghệ thuật</h1>
          <div className="events-list">
            {events.map((event, index) => (
              <Link style={{textDecoration:'none'}} to="/event-detail">
                <EventCard
                className=""
                key={index}
                image={event.image}
                title={event.title} 
                price={event.price}
                date={event.date}
              />
              </Link>
            ))}
          </div>
        </div>
      </>
    );
}

export default EventByCategory;
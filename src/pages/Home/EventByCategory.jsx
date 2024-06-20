import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import { GetEventByCategoryService } from "../../services/EventService";
import { encodeId } from "../../utils/utils";

function EventByCategory({ categoryId, categoryName }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await GetEventByCategoryService(categoryId);
        if (Array.isArray(response)) {
          setEvents(response);
        }
        else {
          console.error ("response is not an array", response)
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [categoryId]);

  return (
    <div className="app">
      <div>
      <h1 style={{ color: "white", marginLeft: "128px", fontSize: "2rem" }}>
        {categoryName}
      </h1>
      <Link to={`/events/${categoryId}`} className="see-more-button">
        Xem thêm <i class="bi bi-chevron-right"></i>
      </Link>
      </div>
      
      <div className="events-list">
        {events.slice(0, 4).map((event) => {
          const lowestPrice = event.tickettypes.reduce(
            (min, ticketType) => Math.min(min, ticketType.price),
            event.tickettypes[0]?.price || 0
          );

          const priceDisplay =
            lowestPrice === 0
              ? "Miễn phí"
              : `Từ ${lowestPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}`;

          return (
            <Link
              key={event.eventId}
              style={{ textDecoration: "none" }}
              to={`/event-detail/${encodeId(event.eventId)}`}
            >
              <EventCard
                image={event.themeImage}
                title={event.eventName}
                price={priceDisplay}
                date={new Date(event.startTime).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default EventByCategory;

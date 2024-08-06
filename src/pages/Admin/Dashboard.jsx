import React, { useEffect, useState } from "react";
import Header from "../../component/Admin/Header";
import Navbar from "../../component/Admin/Navbar";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import {
  getMonthlyRevenue,
  getMonthlyParticipants,
  getTopRateEvent,
  getTopRevenueEvent,
  getTopParticipantsEvent,
  exportEventStatisticsReport,
} from "../../services/StatisticService";
import "../../assets/css/dashboard.css";
import Footer from "../../component/Footer";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement
);
const Dashboard = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [monthlyParticipants, setMonthlyParticipants] = useState([]);
  const [topRateEvents, setTopRateEvents] = useState([]);
  const [topRevenueEvents, setTopRevenueEvents] = useState([]);
  const [topParticipantsEvents, setTopParticipantsEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          revenueResult,
          participantsResult,
          rateEventsResult,
          revenueEventsResult,
          participantsEventsResult,
        ] = await Promise.all([
          getMonthlyRevenue(),
          getMonthlyParticipants(),
          getTopRateEvent(),
          getTopRevenueEvent(),
          getTopParticipantsEvent(),
        ]);

        setMonthlyRevenue(revenueResult);
        setMonthlyParticipants(participantsResult);
        setTopRateEvents(rateEventsResult);
        setTopRevenueEvents(revenueEventsResult);
        setTopParticipantsEvents(participantsEventsResult);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatData = (data, key) => {
    const labels = data.map((item) => `${item.year}-${item.month}`);
    const values = data.map((item) => item[key]);

    return {
      labels,
      datasets: [
        {
          label:
            key === "totalRevenue" ? "Monthly Revenue" : "Monthly Participants",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
      ],
    };
  };

  const formatTopEventsData = (data, valueKey, labelKey) => {
    const labels = data.map((item) => item[labelKey]);
    const values = data.map((item) => item[valueKey]);

    return {
      labels,
      datasets: [
        {
          label: valueKey,
          data: values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const revenueData = formatData(monthlyRevenue, "totalRevenue");
  const participantsData = formatData(monthlyParticipants, "totalParticipants");
  const topRevenueEventsData = formatTopEventsData(
    topRevenueEvents,
    "Revenue",
    "eventName"
  );
  const topParticipantsEventsData = formatTopEventsData(
    topParticipantsEvents,
    "participants",
    "eventName"
  );

  const handleDownloadReport = async () => {
    try {
      const response = await exportEventStatisticsReport();
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "StatisticsReport.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download report", error);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>
        ))}
        {halfStar && <i className="bi bi-star-half text-warning"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
        ))}
      </>
    );
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5,
        },
      },
    },
  };

  return (
    <div>
      <div className="dashboard-container">
        <Header />
        <Navbar />
        {/* <h1 className="dashboard-title">Dashboard</h1> */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header revenue-header">
              <h5 className="card-title">Monthly Revenue</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : (
                <Bar data={revenueData} options={chartOptions} />
              )}
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-header participants-header">
              <h5 className="card-title">Monthly Participants</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : (
                <Pie data={participantsData} options={chartOptions} />
              )}
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-header rating-header">
              <h5 className="card-title text-black text-center">
                Top Rated Events
              </h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : (
                <ul className="event-list">
                  {topRateEvents
                    .sort((a, b) => b.averageRating - a.averageRating)
                    .slice(0, 5)
                    .map((event, index) => (
                      <li key={index} className="event-item">
                        <span className="event-name">{event.eventName}</span>
                        <span className="event-rating">
                          {renderStars(event.averageRating)}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-header revenue-events-header">
              <h5 className="card-title">Top Revenue Events</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : (
                <Line data={topRevenueEventsData} options={chartOptions} />
              )}
            </div>
          </div>
          <div className="dashboard-card">
            <div className="card-header participants-events-header">
              <h5 className="card-title">Top Participants Events</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : (
                <Line data={topParticipantsEventsData} options={chartOptions} />
              )}
            </div>
          </div>
        </div>
        <div className="download-section">
          <button className="download-button" onClick={handleDownloadReport}>
            <i className="bi bi-file-earmark-pdf"></i> Download Report
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

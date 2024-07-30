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
  LineElement,
  ArcElement,
  PointElement,
} from "chart.js";
import {
  getTotalRevenue,
  getTotalParticipants,
  getTopRateEvent,
  getTopRevenueEvent,
  getTopParticipantsEvent,
} from "../../services/StatisticService";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement
);

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [totalParticipants, setTotalParticipants] = useState(null);
  const [topRatedEvents, setTopRatedEvents] = useState([]);
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
          ratedEventsResult,
          revenueEventsResult,
          participantsEventsResult,
        ] = await Promise.all([
          getTotalRevenue(),
          getTotalParticipants(),
          getTopRateEvent(),
          getTopRevenueEvent(),
          getTopParticipantsEvent(),
        ]);

        setTotalRevenue(revenueResult);
        setTotalParticipants(participantsResult);
        setTopRatedEvents(ratedEventsResult);
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

  // const handleDownloadReport = async () => {
  //   try {
  //     const response = await request({
  //       method: 'get',
  //       url: 'Statistic/event-report',
  //       responseType: 'blob',
  //     });
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'EventReport.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Failed to download report", error);
  //   }
  // };

  const revenueData = {
    labels: ["Total Revenue"],
    datasets: [
      {
        label: "Total Revenue",
        data: [totalRevenue || 0],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const participantsData = {
    labels: ["Total Participants"],
    datasets: [
      {
        label: "Total Participants",
        data: [totalParticipants || 0],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ratedEventsData = {
    labels: topRatedEvents.map((event) => event.eventName),
    datasets: [
      {
        label: "Average Rating",
        data: topRatedEvents.map((event) => event.averageRating),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueEventsData = {
    labels: topRevenueEvents.map((event) => event.eventName),
    datasets: [
      {
        label: "Total Revenue",
        data: topRevenueEvents.map((event) => event.revenue), // Ensure 'revenue' is a valid field
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const participantsEventsData = {
    labels: topParticipantsEvents.map((event) => event.eventName),
    datasets: [
      {
        label: "Total Participants",
        data: topParticipantsEvents.map((event) => event.participants), // Ensure 'participants' is a valid field
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container">
      <Header />
      <Navbar />
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Total Revenue</h5>
            </div>
            <div className="card-body">
              {loading ? <p>Loading...</p> : <Bar data={revenueData} />}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Total Participants</h5>
            </div>
            <div className="card-body">
              {loading ? <p>Loading...</p> : <Bar data={participantsData} />}
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Top Rated Events</h5>
            </div>
            <div className="card-body">
              {loading ? <p>Loading...</p> : <Bar data={ratedEventsData} />}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Top Revenue Events</h5>
            </div>
            <div className="card-body">
              {loading ? <p>Loading...</p> : <Bar data={revenueEventsData} />}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Top Participants Events</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Bar data={participantsEventsData} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 pb-4">
        <div className="col-12 text-center">
          <button
            className="btn btn-success"
            // onClick={handleDownloadReport}
          >
            <i className="bi bi-file-earmark-pdf"></i> Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Badge,
  Form,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import moment from "moment";
import {
  getEventRevenue,
  getTopRevenueEvents,
} from "../../services/StatisticService";
import { FaSearch, FaTrophy } from "react-icons/fa";
import Footer from "../../component/Footer";
import HeaderAdmin from "../../component/Admin/Header";
import NavbarAdmin from "../../component/Admin/Navbar";

const EventStatisticAdmin = () => {
  const [eventRevenues, setEventRevenues] = useState([]);
  const [topRevenueEvents, setTopRevenueEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const topRevenueResponse = await getTopRevenueEvents();
        setTopRevenueEvents(topRevenueResponse);

        const eventRevenueResponse = await getEventRevenue();
        const formattedData = eventRevenueResponse.map((event) => ({
          ...event,
          startTime: moment
            .utc(event.startTime)
            .local()
            .format("DD/MM/YYYY HH:mm"),
          endTime: moment.utc(event.endTime).local().format("DD/MM/YYYY HH:mm"),
        }));
        setEventRevenues(formattedData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, []);

  const filteredEvents = eventRevenues.filter((event) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="app-header d-flex align-items-center">
        <HeaderAdmin />
      </div>
      <NavbarAdmin />
      <div className="app-body">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <i className="icon-home lh-1"></i>
                <a href="/admin/dashboard" className="text-decoration-none">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item text-light">Event Statistics</li>
            </ol>
            <div className="d-flex align-items-center">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search by event name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </div>
          </div>

          <Row>
            {topRevenueEvents.map((event) => (
              <Col key={event.eventId} sm={12} md={6} lg={4} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Title className="mb-0">
                        {event.eventName}
                      </Card.Title>
                      <FaTrophy className="text-warning" size={24} />
                    </div>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Badge bg="primary">
                        Tổng doanh thu: {event.totalRevenue.toLocaleString()}đ
                      </Badge>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="card mb-2">
            <div className="card-body">
              <div className="table-responsive">
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên sự kiện</th>
                      <th>Ban tổ chức</th>
                      <th>Tổng doanh thu</th>
                      <th>Thời gian bắt đầu</th>
                      <th>Thời gian kết thúc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEvents.map((event, index) => (
                      <tr key={event.eventId}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{event.eventName}</td>
                        <td>{event.organizerName}</td>
                        <td>{event.totalRevenue.toLocaleString()}đ</td>
                        <td>{event.startTime}</td>
                        <td>{event.endTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
              />
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
              />
            </Pagination>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default EventStatisticAdmin;

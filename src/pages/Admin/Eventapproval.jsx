import '../../assets/fonts/icomoon/style.css';
import '../../assets/css/main.css'
import '../../assets/vendor/overlay-scroll/OverlayScrollbars.min.css'
import '../../assets/images/favicon.svg'
import Header from '../../component/Admin/Header'
import Navbar from '../../component/Admin/Navbar'
import React, { useState, useEffect } from 'react';
import '../../assets/css/Event.css';
import { GetEventsForAdminService } from '../../services/EventService';
import { format } from 'date-fns';


const EventApproval = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetEventsForAdminService();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  const filteredEvents = events.filter((event) => {
    if (filterStatus !== 'All' && event.status !== filterStatus) {
      return false;
    }
    if (searchTerm && !event.eventName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent).map((event, index) => ({
    ...event,
    index: indexOfFirstEvent + index + 1,
  }));

  const columns = [
    { title: 'ID', dataIndex: 'index', key: 'index' },
    { title: 'Event Name', dataIndex: 'eventName', key: 'eventName' },
    { title: 'Organizer', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Category', dataIndex: 'categoryName', key: 'categoryName' },
    // { title: 'Description', dataIndex: 'eventDescription', key: 'eventDescription', 
    //     render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />
    //   },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Thời gian bắt đầu', dataIndex: 'startTime', key: 'startTime', render: (event) => formatDate(event.startTime) },
    { title: 'Thời gian kết thúc', dataIndex: 'endTime', key: 'endTime', render: (event) => formatDate(event.endTime) },
    { title: 'Action', key: 'actions', render: (event) => (
        <button onClick={() => handleEventClick(event)} className="btn btn-primary">View Detail</button>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <div className="app-header d-flex align-items-center">
          <Header />
        </div>

        <Navbar />

        <div className="app-body">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item">
                        <i className="icon-home lh-1"></i>
                        <a href="/" className="text-decoration-none">Home</a>
                      </li>
                      <li className="breadcrumb-item text-light">Event Approval</li>
                    </ol>
                  </div>
                  <div className="d-flex">
                    <div className="btn-group me-3">
                      <button className={`btn ${filterStatus === 'All' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('All')}>All</button>
                      <button className={`btn ${filterStatus === 'Đã duyệt' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('Đã duyệt')}>Đã duyệt</button>
                      <button className={`btn ${filterStatus === 'Chờ duyệt' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleFilterChange('Chờ duyệt')}>Chờ duyệt</button>
                    </div>
                    <div className="search-bar">
                      <input type="text" className="form-control" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card mb-2">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped align-middle m-0">
                        <thead>
                          <tr>
                            {columns.map((column) => (
                              <th key={column.key}>{column.title}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {currentEvents.map((event) => (
                            <tr key={event.eventId}>
                              {columns.map((column) => (
                                <td key={column.key}>
                                  {column.render ? column.render(event) : event[column.dataIndex]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <nav>
                  <ul className="pagination" role="navigation" aria-label="Pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(Math.ceil(filteredEvents.length / eventsPerPage)).keys()].map((number) => (
                      <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(filteredEvents.length / eventsPerPage) ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && currentEvent && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="main">
              <div className="row">
                <div className="col-sm-6 picture2">
                  <center>
                    <img className="circle responsive-img" src={currentEvent.themeImage} alt={`Event picture of ${currentEvent.eventName}`} />
                    <span className="btn-tooltip" title="View Event"></span>
                  </center>
                </div>
                <div className="col-sm-6 details">
                  <center>
                    <p className="name"><b>{currentEvent.eventName}</b></p>
                  </center>
                  <center>
                    <p className="organizer">{currentEvent.fullName}</p>
                  </center>
                  <center>
                    <p className="category">{currentEvent.categoryName}</p>
                  </center>
                </div>
              </div>

              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="location">Địa điểm:</label>
                    <p id="location">{currentEvent.location}</p>
                    <label htmlFor="location">Địa chỉ:</label>
                    <p id="location">{currentEvent.address}</p>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="start-time">Thời gian bắt đầu:</label>
                    <p id="start-time">{formatDate(currentEvent.startTime)}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="end-time">Thời gian kết thúc:</label>
                    <p id="end-time">{formatDate(currentEvent.endTime)}</p>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="description">Description:</label>
                    <div id="description" dangerouslySetInnerHTML={{ __html: currentEvent.eventDescription }} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <h5>Ticket Types</h5>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Price</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEvent.tickettypes.map((ticketType) => (
                          <tr key={ticketType.ticketTypeId}>
                            <td>{ticketType.typeName}</td>
                            <td>${ticketType.price}</td>
                            <td>{ticketType.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <button type="button" className="back-btn btn-secondary btn-primary " onClick={handleCloseModal}>Close</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventApproval;

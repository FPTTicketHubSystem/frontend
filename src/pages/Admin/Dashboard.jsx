import { useEffect } from "react";
import Header from "../../component/Admin/Header";
import Navbar from "../../component/Admin/Navbar";

const Dashboard = () => {
  return (
    <div className="app-body">
      <Header />
      <Navbar />
      <div className="container">
        {/* Row start */}
        <div className="row">
          <div className="col-12 col-xl-6">
            {/* Breadcrumb start */}
            <ol className="breadcrumb mb-3">
              <li className="breadcrumb-item">
                <i className="icon-house_siding lh-1" />
                <a href="/" className="text-decoration-none">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">Dashboards</li>
              <li className="breadcrumb-item text-light">Analytics</li>
            </ol>
            {/* Breadcrumb end */}
          </div>
        </div>
        {/* Row end */}
        {/* Row start */}
        <div className="row gx-2">
          <div className="col-xl-6 col-12">
            {/* Row start */}
            <div className="row gx-2">
              <div className="col-12">
                <div className="card mb-2">
                  <div className="card-header">
                    <h5 className="card-title">Tickets</h5>
                  </div>
                  <div className="card-body">
                    <div id="ticketsData" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <div className="card mb-2">
                  <div className="card-header">
                    <h5 className="card-title">Today's Tickets</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Completed</span>
                      <span className="fw-bold">75%</span>
                    </div>
                    <div className="progress small">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "75%" }}
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-12">
                <div className="card mb-2">
                  <div className="card-header">
                    <h5 className="card-title">New Tickets</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Assigned</span>
                      <span className="fw-bold">5</span>
                    </div>
                    <div className="progress small">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "50%" }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Row end */}
          </div>
          <div className="col-xl-6 col-12">
            <div className="row gx-2">
              <div className="col-sm-4 col-6">
                <div className="card px-3 py-2 mb-2 d-flex flex-row align-items-center">
                  <div className="position-relative shape-block">
                    <img
                      src="assets/images/shape1.png"
                      className="img-fluid img-4x"
                      alt="Bootstrap Themes"
                    />
                    <i className="icon-book-open" />
                  </div>
                  <div className="ms-2">
                    <h3 className="m-0 fw-semibold">27</h3>
                    <h6 className="m-0 fw-light text-light">Active</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-6">
                <div className="card px-3 py-2 mb-2 d-flex flex-row align-items-center">
                  <div className="position-relative shape-block">
                    <img
                      src="assets/images/shape2.png"
                      className="img-fluid img-4x"
                      alt="Bootstrap Themes"
                    />
                    <i className="icon-check-circle" />
                  </div>
                  <div className="ms-2">
                    <h3 className="m-0 fw-semibold">18</h3>
                    <h6 className="m-0 fw-light text-light">Solved</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-6">
                <div className="card px-3 py-2 mb-2 d-flex flex-row align-items-center">
                  <div className="position-relative shape-block">
                    <img
                      src="assets/images/shape3.png"
                      className="img-fluid img-4x"
                      alt="Bootstrap Themes"
                    />
                    <i className="icon-x-circle" />
                  </div>
                  <div className="ms-2">
                    <h3 className="m-0 fw-semibold">12</h3>
                    <h6 className="m-0 fw-light text-light">Closed</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-6">
                <div className="card px-3 py-2 mb-2 d-flex flex-row align-items-center">
                  <div className="position-relative shape-block">
                    <img
                      src="assets/images/shape4.png"
                      className="img-fluid img-4x"
                      alt="Bootstrap Themes"
                    />
                    <i className="icon-add_task" />
                  </div>
                  <div className="ms-2">
                    <h3 className="m-0 fw-semibold">3</h3>
                    <h6 className="m-0 fw-light text-light">Open</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-6">
                <div className="card px-3 py-2 mb-2 d-flex flex-row align-items-center">
                  <div className="position-relative shape-block">
                    <img
                      src="assets/images/shape5.png"
                      className="img-fluid img-4x"
                      alt="Bootstrap Themes"
                    />
                    <i className="icon-alert-triangle" />
                  </div>
                  <div className="ms-2">
                    <h3 className="m-0 fw-semibold">5</h3>
                    <h6 className="m-0 fw-light text-light">Critical</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-6">
                <div className="card px-3 py-2 mb-2 d-flex flex-row align-items-center">
                  <div className="position-relative shape-block">
                    <img
                      src="assets/images/shape6.png"
                      className="img-fluid img-4x"
                      alt="Bootstrap Themes"
                    />
                    <i className="icon-access_time" />
                  </div>
                  <div className="ms-2">
                    <h3 className="m-0 fw-semibold">7</h3>
                    <h6 className="m-0 fw-light text-light">High</h6>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card mb-2">
                  <div className="card-header">
                    <h5 className="card-title">Avg. Response Time</h5>
                  </div>
                  <div className="card-body">
                    <div id="avgTimeData" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Row end */}
        {/* Row start */}
        <div className="row gx-2">
          <div className="col-xl-4 col-md-6 col-sm-12 col-12">
            <div className="card mb-2">
              <div className="card-header">
                <h5 className="card-title">Live Calls</h5>
              </div>
              <div className="card-body">
                <div id="liveCallsData" />
                <div className="d-flex justify-content-center gap-4 my-4">
                  <div className="d-flex align-items-center">
                    <i className="icon-phone-incoming me-3" /> Incoming
                    <span className="badge rounded-pill bg-primary ms-2">
                      15
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="icon-phone-outgoing me-3" /> Outgoing
                    <span className="badge rounded-pill bg-secondary ms-2">
                      18
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 col-sm-12 col-12">
            <div className="card mb-2">
              <div className="card-header">
                <h5 className="card-title">Agents Online</h5>
              </div>
              <div className="card-body">
                <div id="agentsLiveData" />
                <div className="d-flex justify-content-center gap-4 my-4">
                  <div className="d-flex align-items-center">
                    Busy
                    <span className="badge rounded-pill bg-primary ms-2">
                      15
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    Online
                    <span className="badge rounded-pill bg-secondary ms-2">
                      18
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    Offline
                    <span className="badge rounded-pill bg-dark ms-2">13</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-12 col-12">
            <div className="card mb-2">
              <div className="card-header">
                <h5 className="card-title">Tickets by Priority</h5>
              </div>
              <div className="card-body">
                <div id="lticketsPriorityData" />
                <div className="d-flex justify-content-center gap-4 my-4">
                  <div className="d-flex align-items-center">
                    High
                    <span className="badge rounded-pill bg-primary ms-2">
                      15
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    Medium
                    <span className="badge rounded-pill bg-secondary ms-2">
                      18
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    Low
                    <span className="badge rounded-pill bg-dark ms-2">13</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Row end */}
        {/* Row start */}
        <div className="row gx-2">
          <div className="col-xl-6 col-lg-12 col-12">
            <div className="card mb-2">
              <div className="card-header">
                <h5 className="card-title">Top 5 Agents</h5>
              </div>
              <div className="card-body">
                <div className="border rounded-3">
                  <div className="table-responsive">
                    <table className="table align-middle custom-table m-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Agent</th>
                          <th>Tickets</th>
                          <th>Time Spent</th>
                          <th>Feedback</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <div className="fw-semibold">Elisa Shah</div>
                          </td>
                          <td>
                            <span className="badge bg-primary">54</span>
                          </td>
                          <td>
                            <span className="badge border border-light">
                              2 Hrs 30 Mins
                            </span>
                          </td>
                          <td>
                            <div className="starReadOnly1 rating-stars my-2" />
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            <div className="fw-semibold">Ladonna Jones</div>
                          </td>
                          <td>
                            <span className="badge bg-primary">49</span>
                          </td>
                          <td>
                            <span className="badge border border-light">
                              2 Hrs 21 Mins
                            </span>
                          </td>
                          <td>
                            <div className="starReadOnly2 rating-stars my-2" />
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>
                            <div className="fw-semibold">Jewel Alexander</div>
                          </td>
                          <td>
                            <span className="badge bg-primary">45</span>
                          </td>
                          <td>
                            <span className="badge border border-light">
                              2 Hrs 15 Mins
                            </span>
                          </td>
                          <td>
                            <div className="starReadOnly1 rating-stars my-2" />
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            <div className="fw-semibold">Rich Spears</div>
                          </td>
                          <td>
                            <span className="badge bg-primary">42</span>
                          </td>
                          <td>
                            <span className="badge border border-light">
                              2 Hrs 10 Mins
                            </span>
                          </td>
                          <td>
                            <div className="starReadOnly1 rating-stars my-2" />
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            <div className="fw-semibold">Shelly Daniel</div>
                          </td>
                          <td>
                            <span className="badge bg-primary">38</span>
                          </td>
                          <td>
                            <span className="badge border border-light">
                              2Hrs 05Mins
                            </span>
                          </td>
                          <td>
                            <div className="starReadOnly1 rating-stars my-2" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className="card mb-2">
              <div className="card-header">
                <h5 className="card-title">Feedback</h5>
              </div>
              <div className="card-body">
                <div className="scroll300">
                  <div className="my-2">
                    <div className="d-flex align-items-start">
                      <div className="media-box me-3 bg-primary rounded-5">
                        <i className="icon-thumbs-up" />
                      </div>
                      <div className="mb-4">
                        <h5>Christian Ochoa</h5>
                        <p className="mb-1">Amazing</p>
                        <p className="m-0 text-light">3 mins ago</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start">
                      <div className="media-box me-3 bg-primary rounded-5">
                        <i className="icon-thumbs-up" />
                      </div>
                      <div className="mb-4">
                        <h5>Marci Aguirre</h5>
                        <p className="mb-1">
                          Great as always. All sorted with in a short time.
                        </p>
                        <p className="m-0 text-light">5 mins ago</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start">
                      <div className="media-box me-3 bg-primary rounded-5">
                        <i className="icon-thumbs-up" />
                      </div>
                      <div className="mb-4">
                        <h5>Rico Barry</h5>
                        <p className="mb-1">All sorted with in a short time.</p>
                        <p className="m-0 text-light">5 mins ago</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start">
                      <div className="media-box me-3 bg-primary rounded-5">
                        <i className="icon-thumbs-up" />
                      </div>
                      <div className="mb-4">
                        <h5>Dawn Shepherd</h5>
                        <p className="mb-1">Great support guys</p>
                        <p className="m-0 text-light">6 mins ago</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start">
                      <div className="media-box me-3 bg-danger rounded-5">
                        <i className="icon-thumbs-down" />
                      </div>
                      <div className="mb-4">
                        <h5>Heidi Ali</h5>
                        <p className="mb-1">Sorry guys</p>
                        <p className="m-0 text-light">6 mins ago</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start">
                      <div className="media-box me-3 bg-primary rounded-5">
                        <i className="icon-thumbs-up" />
                      </div>
                      <div className="mb-4">
                        <h5>Julio Olson</h5>
                        <p className="mb-1">Awesome support</p>
                        <p className="m-0 text-light">9 mins ago</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start">
                      <div className="media-box me-3 bg-primary rounded-5">
                        <i className="icon-thumbs-up" />
                      </div>
                      <div className="mb-4">
                        <h5>Lily Lyons</h5>
                        <p className="mb-1">Thanks</p>
                        <p className="m-0 text-light">9 mins ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className="card mb-2">
              <div className="card-header">
                <h5 className="card-title">New Tickets vs Closed</h5>
              </div>
              <div className="card-body">
                <div id="newClosedGraph" />
              </div>
            </div>
          </div>
        </div>
        {/* Row end */}
      </div>
      {/* end container */}
    </div>
    //end app-body
  );
};
export default Dashboard;

import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <nav className="navbar2 navbar-expand-lg p-0">
      <div className="container">
        <div className="offcanvas offcanvas-end" id="MobileMenu">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title semibold">Navigation</h5>
            <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="offcanvas">
              <i className="icon-clear"></i>
            </button>
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item dropdown ${isActive('/')}`}>
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dashboards
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    <span>Analytics</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="reports.html">
                    <span>Reports</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className={`nav-item dropdown ${isActive('/events')}`}>
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Events
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/eventapproval">
                    <span>Event Approval</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="open-tickets.html">
                    <span>Open Tickets</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="pending-tickets.html"><span>Pending Tickets</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="closed-tickets.html"><span>Closed Tickets</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="solved-tickets.html"><span>Solved Tickets</span></a>
                </li>
              </ul>
            </li>
            <li className={`nav-item ${isActive('/clients')}`}>
              <a className="nav-link" href="clients.html"> Clients </a>
            </li>
            <li className={`nav-item ${isActive('/user')}`}>
              <a className="nav-link" href="/user"> User </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Pages
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="agent-profile.html">
                    <span>Agent Profile</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="starter-page.html">
                    <span>Starter Page</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="client-list.html">
                    <span>Client List</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="create-invoice.html">
                    <span>Create Invoice</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="invoice.html">
                    <span>Invoice Details</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="invoice-list.html">
                    <span>Invoice List</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="faq.html">
                    <span>FAQ</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="contact-us.html">
                    <span>Contact Us</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="notifications.html">
                    <span>Notifications</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="subscribers.html">
                    <span>Subscribers</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="placeholder.html">
                    <span>Placeholder</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="account-settings.html">
                    <span>Account Settings</span></a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                UI Elements
              </a>
              <ul className="dropdown-menu mega-menu">
                <li>
                  <a className="dropdown-item" href="accordions.html">
                    <span>Accordions</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="alerts.html">
                    <span>Alerts</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="buttons.html">
                    <span>Buttons</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="badges.html">
                    <span>Badges</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="cards.html">
                    <span>Cards</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="custom-cards.html">
                    <span>Custom Cards</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="carousel.html">
                    <span>Carousel</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="icons.html">
                    <span>Icons</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="list-items.html">
                    <span>List Items</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="modals.html">
                    <span>Modals</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="progress.html">
                    <span>Progress Bars</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="popovers.html">
                    <span>Popovers</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="tables.html">
                    <span>Tables</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="tabs.html">
                    <span>Tabs</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="tooltips.html">
                    <span>Tooltips</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="typography.html">
                    <span>Typography</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Forms
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="form-inputs.html"><span>Basic Inputs</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="form-checkbox-radio.html"><span>Checkbox &amp; Radio</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="form-file-input.html"><span>File Input</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="form-validations.html"><span>Validations</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="form-layouts.html">Form Layouts</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Plugins
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="apex.html"><span>Apex Graphs</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="morris.html"><span>Morris Graphs</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="editor.html"><span>Editor</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="calendar.html"><span>Calendar Daygrid View</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="calendar-external-draggable.html"><span>Calendar External
                          Draggable</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="calendar-google.html"><span>Calendar Google</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="calendar-list-view.html"><span>Calendar List View</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="calendar-selectable.html"><span>Calendar Selectable</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="date-time-pickers.html"><span>Date Time Pickers</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="datatables.html"><span>Data Tables</span></a>
                </li>
                <li>
                  <a className="dropdown-item" href="maps.html"><span>Maps</span></a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Login
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/login">
                    <span>Login</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="signup.html">
                    <span>Signup</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="forgot-password.html">
                    <span>Forgot Password</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="page-not-found.html">
                    <span>Page Not Found</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="maintenance.html">
                    <span>Maintenance</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

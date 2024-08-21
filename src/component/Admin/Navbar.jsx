import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg p-0">
      <div className="container">
        <div className="offcanvas offcanvas-end" id="MobileMenu">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title semibold">Navigation</h5>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              data-bs-dismiss="offcanvas"
            >
              <i className="icon-clear"></i>
            </button>
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item dropdown ${isActive("/")}`}>
              <li className={`nav-item ${isActive("/admin/dashboard")}`}>
                <button
                  className="nav-link"
                  href="#"
                  onClick={() => handleNavigate("/admin/dashboard")}
                >
                  Dashboard
                </button>
              </li>
            </li>
            <li className={`nav-item dropdown ${isActive("/")}`}>
              <li className={`nav-item ${isActive("/admin/event-statistic")}`}>
                <button
                  className="nav-link btn btn-link"
                  onClick={() => handleNavigate("/admin/event-statistic")}
                >
                  Event Statistic
                </button>
              </li>
            </li>
            <li className={`nav-item ${isActive("/admin/manage-news")}`}>
              <button
                className="nav-link"
                href="#"
                onClick={() => handleNavigate("/admin/manage-news")}
              >
                News
              </button>
            </li>
            <li className={`nav-item ${isActive("/admin/events")}`}>
              <button
                className="nav-link"
                href="#"
                onClick={() => handleNavigate("/admin/events")}
              >
                Event
              </button>
            </li>
            <li className={`nav-item ${isActive("/admin/user")}`}>
              <button
                className="nav-link"
                href="#"
                onClick={() => handleNavigate("/admin/user")}
              >
                User
              </button>
            </li>
            <li className={`nav-item ${isActive("/admin/forum")}`}>
              <button
                className="nav-link"
                href="#"
                onClick={() => handleNavigate("/admin/forum")}
              >
                Forum
              </button>
            </li>
            <li className={`nav-item ${isActive("/login")}`}>
              <button
                className="nav-link"
                href="#"
                onClick={() => handleNavigate("/login")}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;

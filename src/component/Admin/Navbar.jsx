import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
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
            <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="offcanvas">
              <i className="icon-clear"></i>
            </button>
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item dropdown ${isActive('/')}`}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dashboards
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleNavigate('/')}
                  >
                    <span>Analytics</span>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleNavigate('/reports')}
                  >
                    <span>Reports</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className={`nav-item ${isActive('/admin/events')}`}>
              <a
                className="nav-link"
                href="#"
                onClick={() => handleNavigate('/admin/events')}
              >
                Event
              </a>
            </li>
            <li className={`nav-item ${isActive('/admin/user')}`}>
              <a
                className="nav-link"
                href="#"
                onClick={() => handleNavigate('/admin/user')}
              >
                User
              </a>
            </li>
            <li className={`nav-item ${isActive('/admin/forum')}`}>
              <a
                className="nav-link"
                href="#"
                onClick={() => handleNavigate('/admin/forum')}
              >
                Forum
              </a>
            </li>
            <li className={`nav-item ${isActive('/login')}`}>
              <a
                className="nav-link"
                href="#"
                onClick={() => handleNavigate('/login')}
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import "bootstrap/dist/css/bootstrap.css";
import { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoSrc from "../assets/images/logo/2.png";
import "../assets/css/header.css";
import "../assets/css/bootstrap.min.css";

export default function Header() {
  const [isNotAtTop, setIsNotAtTop] = useState(window.scrollY !== 0);
  const eventListener = useRef(null);

  useEffect(() => {
    eventListener.current = window.addEventListener("scroll", () => {
      setIsNotAtTop(window.scrollY !== 0);
    });

    return () => {
      if (eventListener.current) {
        window.removeEventListener("scroll", eventListener.current);
      }
    };
  }, []);

  const navigate = useNavigate();

  const { user, token, onSetUser, onSetRender } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.clear();
    onSetUser({
      data: "",
      token: "",
    });
    onSetRender();
    navigate("/login");
    toast.success("Đã đăng xuất!");
  };

  return (
    <>
      <div className={"sticky-top mt-0" + (isNotAtTop ? " bg-black" : "")}>
        <nav className="navbar navbar-expand-lg pt-0 pb-0">
          <div className="container">
            <Link to="/" className="navbar-brand text-white">
              <img src={logoSrc} height={80} alt="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav align-items-lg-center mx-auto">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Tìm kiếm"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-light"
                    type="submit"
                    style={{ backgroundColor: "#EC6C21" }}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </form>

                <li className="nav-item">
                  <a className="nav-link click-scroll" href="#section_2">
                    Giải trí
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link click-scroll" href="#section_3">
                    Giáo dục
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link click-scroll" href="#section_5">
                    Thể thao
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link click-scroll" href="#section_6">
                    Sự kiện khác
                  </a>
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center ms-auto">
              {!token ? (
                <Link to="/login" className="btn custom-btn d-lg-block d-none">
                  Đăng nhập
                </Link>
              ) : (
                <>
                  <Link
                    to="/tickets"
                    className="btn custom-btn d-lg-block d-none me-3"
                  >
                    <i className="bi-ticket-perforated me-2"></i>
                    Vé của tôi
                  </Link>
                  <div className="dropdown">
                    <a
                      className="dropdown"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {!user.avatar ? (
                        <img
                          src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                          alt="Avatar"
                          className="rounded-circle"
                          width="50"
                          height="50"
                        />
                      ) : (
                        <img
                          src={user.avatar}
                          alt="Avatar"
                          className="rounded-circle"
                          width="50"
                          height="50"
                          style={{border: 'solid #ffffff'}}
                        />
                      )}
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        {user.roleId === 3 ? (
                          <Link className="dropdown-item" to="/profile">
                            <span>
                              <i className="bi bi-person-circle"></i>
                            </span>{" "}
                            Hồ sơ ban tổ chức
                          </Link>
                        ) : (
                          <Link className="dropdown-item" to="/profile">
                            <span>
                              <i className="bi bi-person-circle"></i>
                            </span>{" "}
                            Hồ sơ người dùng
                          </Link>
                        )}
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/tickets">
                          <span>
                            <i className="bi bi-ticket-perforated"></i>
                          </span>{" "}
                          Vé của tôi
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={handleLogout}>
                          <span>
                            <i className="bi bi-box-arrow-right"></i>
                          </span>{" "}
                          Đăng xuất
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
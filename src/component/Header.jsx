import "bootstrap/dist/css/bootstrap.css";
import { useContext, useState, useEffect, useRef } from "react";
import videoBg from "../assets/css/Thumel.mp4";
import "../assets/css/header.css";
import "../assets/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoSrc from "../assets/images/logo/2.png";

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
        <nav class="navbar navbar-expand-lg pt-0 pb-0">
          <div class="container">
            <Link to="/" class="navbar-brand text-white">
              <img src={logoSrc} height={80} alt="logo" />
            </Link>
            {/* <Link to="/login" class="btn custom-btn d-lg-none ms-auto me-4">Đăng nhập</Link> */}
            {!token ? (
              <Link
                to="/login"
                className="btn custom-btn d-lg-none ms-auto me-4"
              >
                Đăng nhập
              </Link>
            ) : (
              <div className="dropdown">
                <a
                  className="d-lg-none ms-auto me-4"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                    alt="Avatar"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Hồ sơ người dùng
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/tickets">
                      Vé đã mua
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div>
            )}

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav align-items-lg-center mx-auto">
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

                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_2">
                    Giải trí
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_3">
                    Giáo dục
                  </a>
                </li>
                {/* 
                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_4">
                    Workshop
                  </a>
                </li> */}

                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_5">
                    Thể thao
                  </a>
                </li>

                <li class="nav-item">
                  <a class="nav-link click-scroll" href="#section_6">
                    Sự kiện khác
                  </a>
                </li>
              </ul>
              {/* <a href="/login" class="btn custom-btn d-lg-block d-none">Sign In</a> */}
              {/* <Link to="/login" class="btn custom-btn d-lg-block d-none">Đăng nhập</Link> */}
            </div>
            {/* <a href="" class="btn custom-btn d-lg-block d-none me-3">
              <i class="bi-ticket-perforated me-2"></i>
              Vé của tôi
            </a> */}
            

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
              <i class="bi-ticket-perforated me-2"></i>
              Vé của tôi
            </Link>
              <div className="dropdown">
                <a
                  className="dropdown-toggle"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                    alt="Avatar"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Hồ sơ người dùng
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/tickets">
                      Vé đã mua
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </a>
                  </li>
                </ul>
              </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
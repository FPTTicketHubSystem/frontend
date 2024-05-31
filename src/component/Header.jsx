import 'bootstrap/dist/css/bootstrap.css';
import { useContext } from 'react';
import videoBg from '../assets/css/Thumel.mp4';
import '../assets/css/header.css';
import '../assets/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Header() {

    const navigate = useNavigate();

    const { user, token, onSetUser, onSetRender } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.clear();
        onSetUser({
            data: "",
            token: "",
        })
        onSetRender();
        navigate("/login");
        toast.success('Đã đăng xuất!');
    };

    return (
        <>
            <div className='sticky-top mt-0'>
                <nav class="navbar navbar-expand-lg pt-0 pb-0">
                    <div class="container">
                        <Link to="/" class="navbar-brand text-white">FPTTicketHub.com</Link>
                        {/* <Link to="/login" class="btn custom-btn d-lg-none ms-auto me-4">Đăng nhập</Link> */}
                        {
                                (token) ? (
                                    <Link to="/login" className="btn custom-btn d-lg-none ms-auto me-4">Đăng nhập</Link>
                                ) : (

                                    <div className="dropdown">
                                        <a className="btn custom-btn d-lg-none ms-auto me-4" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" alt="Avatar" className="rounded-circle" width="40" height="40" />
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                                            <li><Link className="dropdown-item" to="/profile">Hồ sơ người dùng</Link></li>
                                            <li><Link className="dropdown-item" to="/tickets">Vé đã mua</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a></li>
                                        </ul>
                                    </div>

                                )
                            }

                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                             <span class="navbar-toggler-icon"></span>
                        </button>


                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                                <li class="nav-item">
                                    <a class="nav-link click-scroll" href="#section_1">Trang chủ</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link click-scroll" href="#section_2">Giải trí</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link click-scroll" href="#section_3">Giáo dục</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link click-scroll" href="#section_4">Workshop</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link click-scroll" href="#section_5">Thể thao</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link click-scroll" href="#section_6">Sự kiện khác</a>
                                </li>
                            </ul>
                            {/* <a href="/login" class="btn custom-btn d-lg-block d-none">Sign In</a> */}
                            {/* <Link to="/login" class="btn custom-btn d-lg-block d-none">Đăng nhập</Link> */}
                            {
                                (!token) ? (
                                    <Link to="/login" className="btn custom-btn d-lg-block d-none">Đăng nhập</Link>
                                ) : (

                                    <div className="dropdown">
                                        <a className="dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" alt="Avatar" className="rounded-circle" width="40" height="40" />
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                                            <li><Link className="dropdown-item" to="/profile">Hồ sơ người dùng</Link></li>
                                            <li><Link className="dropdown-item" to="/tickets">Vé đã mua</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a></li>
                                        </ul>
                                    </div>

                                )
                            }

                        </div>
                    </div>
                </nav>
            </div>

           
        </>
    )
}
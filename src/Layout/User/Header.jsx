import "../../assets/HeaderNavStyle.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'antd';
import { useState, useContext } from "react";
import Navbar from "./Navbar";
// import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { UserContext } from "../../context/UserContext";

export default function Header() {

    const { user, onSetUser, onSetRender } = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    const styles = {
        fontSize: '40px', 
        fontFamily: 'Arial, sans-serif',
    }
    const onLogOut = () => {
        // removeCookie('token', { path: '/' });
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.clear();
        onSetUser({
            data: "",
            token: "",
        })
        onSetRender();
        navigate("/");
    };

    const itemsOfAvatar = [
        {
            key: '1',
            label: (
                <>
                    <div>
                        <a style={{ textDecoration: 'none', color: 'black' }} onClick={() => { navigate("/profile"); }}>
                            <button type="button" tabindex="0" role="menuitem" class="sc-dOSReg lhXIuw dropdown-item" style={{ color: "black" }}>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="#000000" class="nav-icon"><path d="M18.75 0.75H6.75C6.21957 0.75 5.71086 0.960714 5.33579 1.33579C4.96071 1.71086 4.75 2.21957 4.75 2.75V14.75C4.75 15.2804 4.96071 15.7891 5.33579 16.1642C5.71086 16.5393 6.21957 16.75 6.75 16.75H18.75C19.2804 16.75 19.7891 16.5393 20.1642 16.1642C20.5393 15.7891 20.75 15.2804 20.75 14.75V2.75C20.75 2.21957 20.5393 1.71086 20.1642 1.33579C19.7891 0.960714 19.2804 0.75 18.75 0.75ZM12.75 3.25C13.413 3.25 14.0489 3.51339 14.5178 3.98223C14.9866 4.45107 15.25 5.08696 15.25 5.75C15.25 6.41304 14.9866 7.04893 14.5178 7.51777C14.0489 7.98661 13.413 8.25 12.75 8.25C12.087 8.25 11.4511 7.98661 10.9822 7.51777C10.5134 7.04893 10.25 6.41304 10.25 5.75C10.25 5.08696 10.5134 4.45107 10.9822 3.98223C11.4511 3.51339 12.087 3.25 12.75 3.25ZM17.75 13.75H7.75V13.5C7.75 11.651 10.004 9.75 12.75 9.75C15.496 9.75 17.75 11.651 17.75 13.5V13.75Z" fill="#000000"></path><path d="M2.75 6.75H0.75V18.75C0.75 19.853 1.647 20.75 2.75 20.75H14.75V18.75H2.75V6.75Z" fill="#000000"></path></svg>
                                Hồ sơ cá nhân
                            </button>
                        </a>
                    </div>
                </>
            ),
        },
        {
            key: '3',
            label: (
                <>
                    <div>
                        <a style={{ textDecoration: 'none', color: 'black' }} onClick={() => onLogOut()}>
                            <button type="button" tabindex="0" role="menuitem" class="sc-dOSReg lhXIuw dropdown-item" style={{ color: 'black' }}>
                                <img src="../Image/logout.391c8b0f.svg" alt="" width={16} height={20} style={{ marginRight: '10px', marginLeft: '5px' }} />
                                Đăng xuất
                            </button>
                        </a>
                    </div>
                </>
            ),
        },
    ];

    return (
        <div className='sc-ezrdKe bAYFRD header'>
            <div className="divHeader">
            <div>
                <a
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <li
                            class='sc-cTkwdZ degoCR list-inline-item'
                            style={{ color: '#000000', backgroundColor: '#FF8C00', fontSize:"12px", height:"20px", width:"80px" }}
                        >
                            <svg
                                viewBox='0 0 24 24'
                                aria-hidden='true'
                                focusable='false'
                                fill='currentColor'
                                xmlns='http://www.w3.org/2000/svg'
                                class='StyledIconBase-ea9ulj-0 jZGNBW nav-icon'
                                width='16' /* Adjust width */
                                height='16'
                            >
                                <g data-name='Layer 2'>
                                    <path
                                        fill='#000000'
                                        d='M20.42 10.18L12.71 2.3a1 1 0 00-1.42 0l-7.71 7.89A2 2 0 003 11.62V20a2 2 0 001.89 2h14.22A2 2 0 0021 20v-8.38a2.07 2.07 0 00-.58-1.44zM10 20v-6h4v6zm9 0h-3v-7a1 1 0 00-1-1H9a1 1 0 00-1 1v7H5v-8.42l7-7.15 7 7.19z'
                                        data-name='home'
                                    ></path>
                                </g>
                            </svg>
                            Trang chủ
                        </li>
                    </a>
                </div>
                <div className="headerLeft" style={{ paddingLeft: '5%' }}>
                    <div className="imgLogo" onClick={() => { navigate("/"); }}>
                        <img src="../Image/Logo.png" alt="" />
                    </div>
                    <div className="slogun">
                        <span style={styles}>Cộng Đồng Sự Kiện</span>
                    </div>
                </div>
                <div className="headerRight">
                    {user
                        ?
                        <>
                            <Dropdown
                                menu={{
                                    items: itemsOfAvatar,
                                }}
                            >
                                <div style={{ borderRadius: '50%', border: '3px solid white', padding: '6px' }}>
                                    {user.avatar != null ?
                                        <>
                                            <img src={user.avatar} alt="" width={60} height={50} style={{borderRadius: '50%', objectFit: "cover"}}/>
                                        </> : <>
                                            <img src="../Image/Avatar_Null.png" alt="" width={40} height={50} style={{borderRadius: '50%', objectFit: "cover"}}/>

                                        </>
                                    }
                                </div>
                            </Dropdown>
                        </>
                        :
                        <>
                            <a className="btnDangNhap" onClick={() => { navigate('/login'); }}>Đăng nhập</a>
                        </>
                    }

                </div>
            </div>
            <div style={{ width: '80%', margin: 'auto' }}>
                <Navbar />
            </div>

        </div>
    )
}
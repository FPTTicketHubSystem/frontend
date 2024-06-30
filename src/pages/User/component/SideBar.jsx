// src/Sidebar.js
import React from 'react';
import { Layout } from 'antd';

const { Sider } = Layout;

const SideBar = () => {
    return (
        <Sider style={{ height: '100vh', }}>
            <div style={{ color: '#fff', display: "flex" }}>
                <img
                    src="https://via.placeholder.com/80"
                    alt="Profile"
                    style={{ borderRadius: '50%', width: '40px', marginBottom: '10px' }}
                />
                <div style={{
                    marginLeft: "1rem"
                }}>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>Tài khoản của</div>
                    <h5 style={{ color: '#fff', margin: '5px 0' }}>Phạm Phú Đức</h5>
                </div>
            </div>
            <div style={{ margin: "1rem" }}>
                <div key="1" style={{ color: '#fff' }}>
                    Thông tin tài khoản
                </div>
                <div key="2" style={{ color: '#EC6C21' }}>
                    Vé đã mua
                </div>
                <div key="3" style={{ color: '#fff' }}>
                    Sự kiện của tôi
                </div>
            </div>
        </Sider>
    );
};

export default SideBar;

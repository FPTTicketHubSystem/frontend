import Ticket from "./component/Ticket";
import SideBar from "./component/SideBar";
import { Container } from "react-bootstrap";
import { RightOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useState } from "react";

import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { Link } from "react-router-dom";

const buttonStyle = {
    height: "1.8rem",
    width: "23.5%",
    borderRadius: "20px",
    fontSize: "1rem",
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "1px solid #EC6C21",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 0.7
};

const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#EC6C21",
    color: "#000000",
    opacity: 1
};

const tabStyle = {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    color: "#ffffff",
    opacity: 0.7
};

const activeTabStyle = {
    ...tabStyle,
    opacity: 1,
    fontWeight: "bold",
    borderBottom: "2px solid #00c853"
};

const ticketParam = {
    orderCode: "237612828",
    eventName: "Khoá tu Mùa Hè TÌM VỀ CHÍNH MÌNH",
    status: "Thành công",
    ticketType: "Vé điện tử",
    date: "11 tháng 07, 2024",
    time: "14:00",
    endDate: "14 tháng 07, 2024",
    endTime: "10:00",
    location: "Tịnh Viện Pháp Thường, Nhơn Trạch Đồng Nai",
    fullLocation: "Tinh Vien Phap Thuong, Huyen Nhon Trach, Dong Nai, Xã Phú Đông, Huyện Nhơn Trạch, Tỉnh Đồng Nai"
};

const MyTicket = () => {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [activeButton, setActiveButton] = useState("all");

    return (
        <div className="bg bg-dark">
            <Header />
            <Container style={{ marginBottom: "3rem" }}>
                Trang chủ <RightOutlined /> Vé đã mua
            </Container>

            <Container className="d-flex">
                <SideBar />
                <div style={{ marginLeft: "150px" }}>
                    <h2>Vé đã mua</h2>
                    <Flex className="py-4 my-3" style={{ borderTop: "2px solid #EC6C21", justifyContent: "space-around" }}>
                        <Button
                            style={activeButton === "all" ? activeButtonStyle : buttonStyle}
                            onClick={() => setActiveButton("all")}
                        >
                            <b>Tất cả</b>
                        </Button>
                        <Button
                            style={activeButton === "successful" ? activeButtonStyle : buttonStyle}
                            onClick={() => setActiveButton("successful")}
                        >
                            <b>Thành công</b>
                        </Button>
                        <Button
                            style={activeButton === "processing" ? activeButtonStyle : buttonStyle}
                            onClick={() => setActiveButton("processing")}
                        >
                            <b>Đang xử lý</b>
                        </Button>
                        <Button
                            style={activeButton === "canceled" ? activeButtonStyle : buttonStyle}
                            onClick={() => setActiveButton("canceled")}
                        >
                            <b>Đã Hủy</b>
                        </Button>
                    </Flex>
                    <Flex style={{ justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
                        <Button
                            style={activeTab === "upcoming" ? activeTabStyle : tabStyle}
                            onClick={() => setActiveTab("upcoming")}
                        >
                            Sắp diễn ra
                        </Button>
                        <Button
                            style={activeTab === "ended" ? activeTabStyle : tabStyle}
                            onClick={() => setActiveTab("ended")}
                        >
                            Đã kết thúc
                        </Button>
                    </Flex>
                    <Link  to="/myticket/detail" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Ticket {...ticketParam} />
                        
                    </Link>
                    
                    <a href="/myticket/detail">
                    <Ticket {...ticketParam} />
                    
                    </a>
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default MyTicket;

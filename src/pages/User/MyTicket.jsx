import Ticket from "./component/Ticket";
import SideBar from "./component/SideBar";
import { Container } from "react-bootstrap";
import { RightOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { Link } from "react-router-dom";

import {GetTicketByAccountService} from "../../services/TicketService";


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
    borderBottom: "2px solid #EC6C21"
};

const MyTicket = () => {
    const {user} = useContext(UserContext);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [activeButton, setActiveButton] = useState("all");
    const [tickets, setTickets] = useState([]);

    const fetchTickets = async () => {
        try {
            const response = await GetTicketByAccountService(user.accountId);
            setTickets(response);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    useEffect(() => {
        if (!user.accountId) {
            return;
        }
        try {
            fetchTickets();
        }
        catch (e) {
            console.error(e);
        }

    }, [user.accountId]);

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
                    <Flex className="py-4 my-3" style={{ borderTop: "1px solid #EC6C21", justifyContent: "space-around" }}>
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
                    {tickets.map(ticket => (
                        <Link key={ticket.ticketId} to={`/myticket/detail/${ticket.ticketId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Ticket 
                                orderCode={ticket.ticketId.toString()}
                                eventName={ticket.eventName}
                                status={ticket.isCheckedIn ? "Đã sử dụng" : "Chưa sử dụng"}
                                ticketType={ticket.typeName}
                                date={new Date(ticket.startTime).toLocaleDateString('vi-VN')}
                                time={new Date(ticket.startTime).toLocaleTimeString('vi-VN')}
                                endDate={new Date(ticket.endTime).toLocaleDateString('vi-VN')}
                                endTime={new Date(ticket.endTime).toLocaleTimeString('vi-VN')}
                                location={ticket.location}
                                fullLocation={ticket.address}
                            />
                        </Link>
                    ))}
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default MyTicket;

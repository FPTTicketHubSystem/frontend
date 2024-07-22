import React, { useEffect, useState, useContext } from 'react';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { RightOutlined } from "@ant-design/icons";
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';
import { GetTicketByIdService } from '../../services/TicketService';
import { UserContext } from "../../context/UserContext";
import { toast } from 'react-toastify';

const TicketDetail = () => {
    const {user} = useContext(UserContext);
    const { id } = useParams();
    const [ticket, setTicket] = useState({});

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const response = await GetTicketByIdService(id);
                if (response.accountId !== user.accountId) {
                    toast.error('Không có quyền truy cập!');
                }
                if (response) {
                    setTicket(response);
                }
                
            } catch (error) {
                console.error("Error fetching ticket details:", error);
            } 
        };

        fetchTicketDetails();
    }, [id]);

    if (!ticket) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg bg-dark">
            <Header />
            <Container style={{ marginBottom: "3rem", color: "white" }}>
                <div className="breadcrumb">
                    Trang chủ <RightOutlined /> Vé đã mua <RightOutlined /> Chi tiết vé
                </div>
            </Container>

            <Container>
                <Card className="mb-3 bg-dark">
                    <Card.Img variant="top" src={ticket.themeImage} />
                    <Card.Body>
                        <Card.Title className="text-center">{ticket.eventName}</Card.Title>
                        <Card.Text className="text-center">
                            <QRCode value={String(ticket.ticketId)} />
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Row>
                    <Col md={12}>
                        <Card className="bg-dark">
                            <Card.Body>
                                <Card.Title className="mb-2">Thông tin đặt vé</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>Loại vé:</strong> {ticket.typeName}</ListGroup.Item>
                                    <ListGroup.Item><strong>Thời gian:</strong> {new Date(ticket.startTime).toLocaleString('vi-VN')} - {new Date(ticket.endTime).toLocaleString('vi-VN')}</ListGroup.Item>
                                    <ListGroup.Item><strong>Đơn hàng:</strong> {ticket.ticketId}</ListGroup.Item>
                                    <ListGroup.Item><strong>Ngày đặt hàng:</strong> {new Date(ticket.orderDate).toLocaleString('vi-VN')}</ListGroup.Item>
                                    <ListGroup.Item><strong>Phương thức thanh toán:</strong> Free</ListGroup.Item>
                                    <ListGroup.Item><strong>Số lượng:</strong> {ticket.quantity}</ListGroup.Item>
                                    <ListGroup.Item><strong>Tổng tạm tính:</strong> 0 đ</ListGroup.Item>
                                    <ListGroup.Item><strong>Tổng tiền:</strong> 0 đ</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-3 mb-3">
                    <Col md={12}>
                        <Card className="bg-dark">
                            <Card.Body>
                                <Card.Title className="mb-2">Thông tin người mua</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>Tên:</strong> {ticket.fullName}</ListGroup.Item>
                                    <ListGroup.Item><strong>Email:</strong> {ticket.email}</ListGroup.Item>
                                    <ListGroup.Item><strong>Số điện thoại:</strong> {ticket.phone}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default TicketDetail;

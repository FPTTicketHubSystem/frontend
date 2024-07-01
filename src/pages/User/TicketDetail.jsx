import React from 'react';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { RightOutlined, IdcardOutlined, FieldTimeOutlined, PushpinFilled } from "@ant-design/icons";
import QRCode from 'qrcode.react';
import coverImg from "../../assets/images/events/event-1.jpg"
import { useEffect } from 'react';
const TicketDetail = () => {
   
    return (
        <div className="bg bg-light">
            <Header />
            <Container style={{ marginBottom: "3rem", color: "white" }}>
                <div className="breadcrumb">
                    Trang chủ <RightOutlined /> Vé đã mua <RightOutlined /> Chi tiết vé
                </div>
            </Container>

            <Container>
                <Card className="mb-3 bg-dark">
                    <Card.Img variant="top" src="coverImg" />
                    <Card.Body>
                        <Card.Title className="text-center">Khóa tu Mùa Hè TÌM VỀ CHÍNH MÌNH</Card.Title>
                        <Card.Text className="text-center">
                            <QRCode value="https://example.com" />
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Row>
                    <Col md={12}>
                        <Card className="bg-dark">
                            <Card.Body>
                                <Card.Title>Thông tin chi tiết</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>Loại vé:</strong> Khóa tu TÌM VỀ CHÍNH MÌNH</ListGroup.Item>
                                    <ListGroup.Item><strong>Thời gian:</strong> 14:00, 11 tháng 07, 2024 - 10:00, 14 tháng 07, 2024</ListGroup.Item>
                                    <ListGroup.Item><strong>Đơn hàng:</strong> 893447803</ListGroup.Item>
                                    <ListGroup.Item><strong>Ngày đặt hàng:</strong> 19:56, 26 tháng 06, 2024</ListGroup.Item>
                                    <ListGroup.Item><strong>Phương thức thanh toán:</strong> Free</ListGroup.Item>
                                    <ListGroup.Item><strong>Tình trạng đơn hàng:</strong> Thành công</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={12}>
                        <Card className="bg-dark">
                            <Card.Body>
                                <Card.Title>Thông tin người mua</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>Tên:</strong> Phạm Phú Đức</ListGroup.Item>
                                    <ListGroup.Item><strong>Email:</strong> dh810123@gmail.com</ListGroup.Item>
                                    <ListGroup.Item><strong>Số điện thoại:</strong> +84337533712</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={12}>
                        <Card className="bg-dark">
                            <Card.Body>
                                <Card.Title>Thông tin đơn hàng</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item><strong>Loại vé:</strong> Khóa tu TÌM VỀ CHÍNH MÌNH</ListGroup.Item>
                                    <ListGroup.Item><strong>Số lượng:</strong> 2</ListGroup.Item>
                                    <ListGroup.Item><strong>Tổng tạm tính:</strong> 0 đ</ListGroup.Item>
                                    <ListGroup.Item><strong>Tổng tiền:</strong> 0 đ</ListGroup.Item>
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

import Header from "../../component/Header";
import { Form, Button, Col, Modal } from 'react-bootstrap';
import { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from "../../context/UserContext";

function Profile() {


    const [isHovered, setIsHovered] = useState(false);
    const { user, token, onSetUser, onSetRender } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [newAvatar, setNewAvatar] = useState(user.avatar || 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg');

    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewAvatar(e.target.result);
                setShowModal(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const ButtonCSS = {
        border: isHovered ? '1px solid #81360b' : '1px solid #EC6C21',
        background: isHovered ? '#81360b' : '#EC6C21'
    }

    return (
        <>
            <div className="bg bg-dark">
                <Header />
                <Form onSubmit='' className="p-3 border rounded shadow-sm" style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#f8f9fa' }}>
                    <div className="text-center mb-3">
                        <img
                            src={newAvatar}
                            alt="Avatar"
                            className="rounded-circle"
                            width="150"
                            height="150"
                            onClick={handleImageClick}
                            style={{ cursor: 'pointer' }}
                        />

                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Ảnh đại diện</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <img src={newAvatar} alt="Full Avatar" className="img-fluid" />
                                <div className="mt-3">
                                    <input type="file" onChange={handleChangeImage} />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <Form.Group className="mb-3" controlId="formFullName">
                        <Form.Label style={{ fontWeight: 'bold' }}>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={user.fullName}
                            onChange=''
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label style={{ fontWeight: 'bold' }}>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={user.phone}
                            onChange=''
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={user.email}
                            onChange=''
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBirthDate">
                        <Form.Label style={{ fontWeight: 'bold' }}>Ngày tháng năm sinh</Form.Label>
                        <Form.Control
                            type="text"
                            name="birthDate"
                            value={user.birthDay}
                            onChange=''
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGender">
                        <Form.Label style={{ fontWeight: 'bold' }}>Giới tính</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                label="Nam"
                                name="gender"
                                value="Nam"
                                checked={user.gender === 'Nam'}
                                onChange=''
                                disabled
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Nữ"
                                name="gender"
                                value="Nữ"
                                checked={user.gender === 'Nữ'}
                                onChange=''
                                disabled
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Khác"
                                name="gender"
                                value="Khác"
                                checked={user.gender === 'Khác'}
                                onChange=''
                                disabled
                            />
                        </div>
                    </Form.Group>
                    <Button type="submit" style={ButtonCSS}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="mb-3 d-block mx-auto" block>
                        Hoàn thành
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default Profile;
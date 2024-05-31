import Header from "../../component/Header";
import { Form, Button, Col } from 'react-bootstrap';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function Profile() {

    const [isHovered, setIsHovered] = useState(false);
    

    const ButtonCSS = {
        border: isHovered ? '1px solid #81360b' : '1px solid #EC6C21',
        background: isHovered ? '#81360b' : '#EC6C21'
    }

    return (
        <>
            <Header />
            <Form onSubmit='' className="p-3 border rounded shadow-sm" style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#f8f9fa'}}>
                <div className="text-center mb-3">
                    <img src="https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg" alt="avatar" className="rounded-circle" />
                </div>
                <Form.Group className="mb-3" controlId="formFullName">
                    <Form.Label style={{fontWeight : 'bold'}}>Họ và tên</Form.Label>
                    <Form.Control
                        type="text"
                        name="fullName"
                        value=''
                        onChange=''
                        disabled
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label  style={{fontWeight : 'bold'}}>Số điện thoại</Form.Label>
                    <Form.Control
                        type="text"
                        name="phoneNumber"
                        value=''
                        onChange=''
                        disabled
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label  style={{fontWeight : 'bold'}}>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value=''
                        onChange=''
                        disabled
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBirthDate">
                    <Form.Label  style={{fontWeight : 'bold'}}>Ngày tháng năm sinh</Form.Label>
                    <Form.Control
                        type="text"
                        name="birthDate"
                        value=''
                        onChange=''
                        disabled
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label  style={{fontWeight : 'bold'}}>Giới tính</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            type="radio"
                            label="Nam"
                            name="gender"
                            value="Nam"
                            checked=''
                            onChange=''
                            disabled
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Nữ"
                            name="gender"
                            value="Nữ"
                            checked=''
                            onChange=''
                            disabled
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Khác"
                            name="gender"
                            value="Khác"
                            checked=''
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
        </>
    );
}

export default Profile;
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { LoginService, LoginByGoogleService, RegisterService, ForgotPasswordService } from '../services/UserService';
import { UserContext } from '../context/UserContext';
import {jwtDecode} from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isHovered, setIsHovered] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgortPasswordModal] = useState(false);

  const ButtonCSS = {
    border: isHovered ? '1px solid #81360b' : '1px solid #EC6C21',
    background: isHovered ? '#81360b' : '#EC6C21'
  };
  const { token, user, render, onSetRender, onSetUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [loginInput, setLoginInput] = useState({
    inputEmail: '',
    inputPassword: '',
  });

  const [registerInput, setRegisterInput] = useState({
    inputFullName: '',
    inputEmail: '',
    inputPhone: '',
    inputPassword: '',
  });

  const [emailForgotPassword, setEmailForgotPassword] = useState('');

  const handleInputLogin = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setLoginInput((loginInput) => ({ ...loginInput, [field]: value }));
  };

  const handleInputRegister = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setRegisterInput((registerInput) => ({ ...registerInput, [field]: value }));
  };

  const validateFullName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validatePhoneNumber = (phone) => /^0\d{9}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      email: loginInput.inputEmail,
      password: loginInput.inputPassword,
    };
    if (!validateEmail(loginInput.inputEmail)) {
      toast.error('Email không hợp lệ!');
      return;
    }
    if (loginInput.inputPassword.trim() === '') {
      toast.error('Mật khẩu không được để trống.');
      return;
    }

    const result = await LoginService(data);

    if (result.status !== undefined && result.status === 200) {
      onSetUser(result);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('user', JSON.stringify(result.data));
      if (result.roleId === 1) {
        toast.success('Admin đăng nhập thành công');
      } else if (result.roleId === 2) {
        toast.success(`Chào ${result.data.fullName}!`);
        navigate('/');
      } else if (result.roleId === 3) {
        toast.success('BTC đăng nhập thành công');
      } else if (result.roleId === 4) {
        toast.success('Staff đăng nhập thành công');
      }
    } else if (result.status === 400 && result.message === 'Please check your email to confirm your account') {
      toast.error('Vui lòng kiểm tra email của bạn để xác thực email!');
    } else if (result.status === 400 && result.message === 'The account is not found') {
      toast.error('Tài khoản không tồn tại!');
    } else if (result.status === 400 && result.message === 'Password is wrong') {
      toast.error('Mật khẩu sai!');
    } else if (result.status === 400 && result.message === 'Your account is blocked. Please contact admin!') {
      toast.error('Tài khoản đang bị khóa. Liên hệ fpttickethub@gmai.com để được hỗ trợ!');
    }
  };

  const onLoginWithGoogle = async (value) => {
    try {
      const decodedToken = jwtDecode(value);
      const data = {
        email: decodedToken.email,
        password: '',
        fullName: decodedToken.name,
        avatar: decodedToken.picture,
        status: 'Đang hoạt động',
      };
      const result = await LoginByGoogleService(data);
      if (result.status === 400 && result.message === 'Create A New Account Successfully') {
        onSetUser(result);
        localStorage.setItem('authToken', result.token);
        toast.success('Đăng nhập thành công, chào mừng người dùng mới!');
        navigate('/');
      } else if (result.status === 200 && result.message === 'Login success!') {
        onSetUser(result);
        localStorage.setItem('authToken', result.token);
        if (result.roleId === 1) {
          toast.success('Admin login thành công');
        } else if (result.roleId === 2) {
          toast.success(`Chào ${result.data.fullName}!`);
          navigate('/');
        } else if (result.roleId === 3) {
          toast.success('BTC login thành công');
        } else if (result.roleId === 4) {
          toast.success('Staff login thành công');
        }
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại!');
      }
      onSetRender();
    } catch (error) {
      console.error('Token decoding error:', error);
      toast.error('Token decoding error');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = {
      fullName: registerInput.inputFullName,
      phoneNumber: registerInput.inputPhone,
      email: registerInput.inputEmail,
      password: registerInput.inputPassword,
    };

    if (!validateFullName(registerInput.inputFullName)) {
      toast.error('Tên đầy đủ không hợp lệ, chỉ chứa chữ cái và khoảng trắng.');
      return;
    }

    if (!validatePhoneNumber(registerInput.inputPhone)) {
      toast.error('Số điện thoại không hợp lệ, phải có 10 số và bắt đầu bằng số 0.');
      return;
    }

    if (!validateEmail(registerInput.inputEmail)) {
      toast.error('Email không hợp lệ!');
      return;
    }

    if (registerInput.inputPassword.trim() === '') {
      toast.error('Mật khẩu không được để trống.');
      return;
    }

    const result = await RegisterService(data);

    if (result.status === 200) {
      toast.success(`Đăng ký thành công, vui lòng kiểm tra email ${registerInput.inputEmail} để xác nhận tài khoản!`);
      setShowRegisterModal(false);
      setRegisterInput({
        inputFullName: '',
        inputEmail: '',
        inputPhone: '',
        inputPassword: '',
      });
      setLoginInput({
        inputEmail: '',
        inputPassword: '',
      });
      onSetRender();
    } else if (result.status === 400) {
      toast.error('Email hoặc số điện thoại đã tồn tại');
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const result = await ForgotPasswordService(emailForgotPassword);
    if (result.result.status === 200) {
      toast.success(`Yêu cầu mật khẩu mới thành công, kiểm tra email ${emailForgotPassword} của bạn!`);
      setEmailForgotPassword('');
      setShowForgortPasswordModal(false);
      setLoginInput({
        inputEmail: '',
        inputPassword: '',
      });
      onSetRender();
    } else if (result.result.status === 400) {
      toast.error(`Tài khoản ${emailForgotPassword} không tồn tại!`);
      setEmailForgotPassword('');
      setLoginInput({
        inputEmail: '',
        inputPassword: '',
      });
      onSetRender();
    }
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col lg={6} md={8} sm={10} className="text-center p-5 border rounded shadow" style={{ backgroundColor: '#f8f9fa' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Đăng nhập</h1>
          <p style={{ fontSize: '1.2rem' }}>
            Chưa có tài khoản?
            <a
              onClick={() => setShowRegisterModal(true)}
              style={{ color: '#EC6C21', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold', marginLeft: '7px' }}
            >
              Đăng ký
            </a>
          </p>
          <Form noValidate onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-4 text-start">
              <Form.Label style={{ fontSize: '1.1rem' }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                name="inputEmail"
                value={loginInput.inputEmail}
                onChange={handleInputLogin}
                required
                style={{ fontSize: '1.1rem', padding: '10px' }}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4 text-start">
              <Form.Label style={{ fontSize: '1.1rem' }}>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                name="inputPassword"
                value={loginInput.inputPassword}
                onChange={handleInputLogin}
                required
                style={{ fontSize: '1.1rem', padding: '10px' }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-4"
              style={ButtonCSS}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Đăng nhập <i class="bi bi-box-arrow-in-left"></i>
            </Button>

            <div className="d-flex justify-content-center align-items-center mb-4">
              <a
                onClick={() => setShowForgortPasswordModal(true)}
                style={{ color: '#EC6C21', cursor: 'pointer', textDecoration: 'underline', fontSize: '1.1rem' }}
              >
                Quên mật khẩu?
              </a>
            </div>

            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" />
              <span className="mx-2" style={{ fontSize: '1.1rem' }}>Hoặc</span>
              <hr className="flex-grow-1" />
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <GoogleOAuthProvider clientId='732153710958-ec1rknfdfm3j7lsoqthnh9kfnr761fvd.apps.googleusercontent.com'>
                <GoogleLogin
                  locale='en'
                  onSuccess={(token) => {
                    onLoginWithGoogle(token.credential);
                  }}
                  onError={() => {
                    toast.error('Có lỗi xảy ra, vui lòng thử lại!');
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </Form>
        </Col>
      </Row>

      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)}>
        <Modal.Header closeButton onClick={() => setShowRegisterModal(false)}>
          <Modal.Title>Đăng ký tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleRegister}>
            <Form.Group controlId="formRegisterFullName" className='w-100 mb-3'>
              <Form.Label>Tên đầy đủ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên đầy đủ"
                name="inputFullName"
                value={registerInput.inputFullName}
                onChange={handleInputRegister}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterEmail" className='w-100 mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                name="inputEmail"
                value={registerInput.inputEmail}
                onChange={handleInputRegister}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterPhoneNumber" className='w-100 mb-3'>
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Nhập số điện thoại"
                name="inputPhone"
                value={registerInput.inputPhone}
                onChange={handleInputRegister}
                required
              />
            </Form.Group>

            <Form.Group controlId="formRegisterPassword" className='w-100 mb-3'>
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                name="inputPassword"
                value={registerInput.inputPassword}
                onChange={handleInputRegister}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 mb-3" style={ButtonCSS} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              Đăng ký
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showForgotPasswordModal} onHide={() => setShowForgortPasswordModal(false)}>
        <Modal.Header closeButton onClick={() => setShowForgortPasswordModal(false)}>
          <Modal.Title>Quên mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleForgotPassword}>
            <Form.Group controlId="formForgotPassword" className='w-100 mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                name="emailForgotPassword"
                value={emailForgotPassword}
                onChange={(e) => setEmailForgotPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="w-100 mb-3" style={ButtonCSS} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              Nhận mật khẩu mới <i class="bi bi-envelope-at"></i>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <ToastContainer position='top-right' /> */}
    </Container>
  );
}

export default Login;
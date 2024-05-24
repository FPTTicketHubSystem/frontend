import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { LoginService, LoginByGoogleService } from '../../Services/UserService';
import { UserContext } from '../../Context/UserContext';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const { token, user, render, onSetRender, onSetUser } = useContext(UserContext);
  const [loginInput, setLoginInput] = useState({
    inputEmail: '',
    inputPassword: '',
  });

  const handleInputLogin = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setLoginInput((loginInput) => ({ ...loginInput, [field]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      email: loginInput.inputEmail,
      password: loginInput.inputPassword,
    };
    console.log('Login data:', data);
    const result = await LoginService(data);

    console.log('Login result:', result);

    if (result.status !== undefined && result.status === 200) {
      onSetUser(result);
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('user', JSON.stringify(result.data));
      if (result.roleId === 1) {
        alert('Admin đăng nhập thành công');
      } else if (result.roleId === 2) {
        alert('User đăng nhập thành công');
      } else if (result.roleId === 3) {
        alert('BTC đăng nhập thành công');
      } else if (result.roleId === 4) {
        alert('Staff đăng nhập thành công');
      }
    } else {
      alert('Đăng nhập thất bại');
    }
  };

  const onLoginWithGoogle = async (value) => {
    try {
      const decodedToken = jwtDecode(value);
      const data = {
        email: decodedToken.email,
        fullName: decodedToken.name,
        avatar: decodedToken.picture,
        status: 'Đang hoạt động',
      };
      const result = await LoginByGoogleService(data);
      if (result.status === 400) {
        onSetUser(result);
        // handleSetCookie(result.token);
        localStorage.setItem('authToken', result.token);
        //navigate('/');
      } else if (result.status === 200) {
        onSetUser(result);
        // handleSetCookie(result.token);
        localStorage.setItem('authToken', result.token);
        if (result.roleId === 2) {
          //navigate('/');
          alert('Thanh cong');
        } else if (result.roleId === 1) {
          //navigate('/admin/manageUser');
          alert('Admin login thanh cong');
        }
      } else {
        alert('vứt đi');
      }
      onSetRender();
    } catch (error) {
      console.error('Token decoding error:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12} className="text-center">
          <h1>Sign in</h1>
          <p>
            Don't have an account? <a href="#signup">Sign up</a>
          </p>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-3 text-start">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                name="inputEmail"
                value={loginInput.inputEmail}
                onChange={handleInputLogin}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3 text-start">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="inputPassword"
                value={loginInput.inputPassword}
                onChange={handleInputLogin}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Check type="checkbox" label="Remember me" />
              <a href="#forgot-password">Forgot password?</a>
            </div>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Log in
            </Button>

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2">or</span>
              <hr className="flex-grow-1" />
            </div>
            <GoogleOAuthProvider clientId='732153710958-nhanb1rjpspdq4m3dnk33a2c1uh2crbi.apps.googleusercontent.com'>
              <GoogleLogin
                locale='en'
                onSuccess={(token) => {
                  onLoginWithGoogle(token.credential);
                }}
                onError={() => {
                  alert('Đăng nhập thất bại')
                }}
              />
            </GoogleOAuthProvider>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
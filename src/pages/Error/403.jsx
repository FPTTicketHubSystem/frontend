import React from 'react';
import { Button, Result } from 'antd';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)`
  background-color: #EC6C21;
  border-color: #EC6C21;

  &:hover {
    background-color: #81360b !important;
    border-color: #81360b !important;
  }
`;

export default function Status403() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/');
      };
    return (
        <>
            <Header />
            <Result
                className="bg bg-light"
                status="403"
                title="403"
                subTitle="Bạn không có quyền truy cập vào trang này."
                extra={<CustomButton type="primary" onClick={handleBackClick}>Quay lại</CustomButton>}
            />
            <Footer />
        </>
    );
}
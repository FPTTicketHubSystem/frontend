import { useParams } from "react-router-dom";
import { ConfirmAccountService } from "../services/UserService";
import { Container, Alert } from "react-bootstrap";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import { Result } from "antd";

export default function ConfirmAccount() {
    const { email } = useParams();
    const [confirmationStatus, setConfirmationStatus] = useState(null);
    

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const result = await ConfirmAccountService(email);
                setConfirmationStatus(result.status);
            } catch (error) {
                console.error("Error confirming account:", error);
            }
        };

        if (email !== undefined) {
            confirmAccount();
        }
    }, [email]);

    return (
        <>
            <div className="bg bg-dark">
                <Header />
            </div>
            <Container className="mt-5 py-5">
                {confirmationStatus === 404 && (
                    <Result
                    status="error"
                    title="Xác thực tài khoản không thành công"
                    subTitle="Hãy thử xác thực lại bằng các truy cập fth.com/emaicuaban" 
                  />
                )}
                {confirmationStatus === 200 && (
                    <Result
                    status="success"
                    title="Xác thực tài khoản thành công"
                    subTitle="Bây giờ bạn đã có thể đăng nhập!" 
                  />
                )}
            </Container>
            <Footer />
        </>
    );
}
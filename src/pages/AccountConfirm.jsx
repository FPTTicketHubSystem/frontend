import { useParams } from "react-router-dom";
import { ConfirmAccountService } from "../services/UserService";
import { Container, Alert, Button } from "react-bootstrap";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function ConfirmAccount() {
    const { email } = useParams();
    if (email !== undefined) {
        const response = async () => {
            const result = await ConfirmAccountService(email);
            return result;
        };
        response();
        return (
            <>
                <div style={{ backgroundColor: 'black' }}>
                    <Header />
                </div>
                <Container className="mt-5">
                    <Alert variant="success">
                        <Alert.Heading>Xác thực tài khoản {email} thành công.</Alert.Heading>
                        <p>
                            Chào mừng bạn đến với trang web của chúng tôi. Bây giờ bạn đã có thể đăng nhập. Chúc bạn có trải nghiệm tốt!
                        </p>
                    </Alert>
                </Container>
            </>
        );
    }

    return (
        <>
            <div style={{ backgroundColor: 'black' }}>
                <Header />
            </div>
            <Container className="mt-5">
                <Alert variant="danger">
                    <Alert.Heading>Xác thực tài khoản.</Alert.Heading>
                    <p>
                        Kiểm tra email của bạn để xác thực tài khoản!
                    </p>
                </Alert>
            </Container>
            
        </>
    );
}
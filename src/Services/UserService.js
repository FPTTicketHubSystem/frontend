import request from '../Utils/request';

export const LoginService = async (data) => {
    try {
        const respone = await request({
            method: "post",
            url: `home/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return respone;
    } catch (e) {
        return (e);
    }
}

export const GetInforService = async (token) => {
    try {
        const response = await request({
            method: "get",
            url: `user/info?token=${token}`,
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const LoginByGoogleService = async (data) => {
    try {
        const response = await request({
            method: "post",
            url: `home/loginByGoogle`,
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const RegisterService = async (data) => {
    try {
        const respone = await request({
            method: "post",
            url: "home/register",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        });
        return respone;
    } catch (e) {
        return e;
    }
}

export const ConfirmAccountService = async (email) => {
    try {
        const respone = await request({
            method: "get",
            url: `home/confirm?email=${email}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return respone;
    } catch (e) {
        return e;
    }
}

export const ForgotPasswordService = async (email) => {
    try {
        const respone = await request({
            method: "post",
            url: `home/forgotPassword?email=${email}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(respone);
        return respone;
    } catch (e) {
        return e;
    }
}
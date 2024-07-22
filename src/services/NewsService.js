import request from '../utils/request';

export const GetAllNewsService = async () => {
    try {
        const response = await request({
            method: 'get',
            url: `news/getAllNews`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        return e;
    }
};

export const GetAllNewsAdminService = async (status = "") => {
    try {
        const response = await request({
            method: 'get',
            url: `news/getAllNewsAdmin?status=${status}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        return e;
    }
};

// export const GetNewsByAccount = async () => {
//     try {
//         const response = await request({
//             method: 'get',
//             url: `news/getAllNews`,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response;
//     } catch (e) {
//         return e;
//     }
// };

export const GetNewsByIdService = async (newsId) => {
    try {
        const response = await request({
            method: 'get',
            url: `news/getNewsById/${newsId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        return e;
    }
};

export const AddNewsService = async (data) => {
    try {
        const response = await request({
            method: 'post',
            url: `news/addnews`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(data),
        });
        return response;
    } catch (e) {
        return e;
    }
}

export const ChangeStatusNewsService = async (newsId, status) => {
        try {
            const response = await request({
                method: 'post',
                url: `news/changeStatusNews?newsId=${newsId}&status=${status}`,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (e) {
            return e;
        }
    }

export const GetNewsInUserPageService = async () => {
    try {
        const response = await request({
            method: 'get',
            url: `news/displayNewsInUserPage`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        return e;
    }
};

export const GetNewsDetailService = async (newsId) => {
    try {
        const response = await request({
            method: 'get',
            url: `news/getNewsById/${newsId}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (e) {
        return e;
    }
};

export const GetNewsInPageService = async (currentPage, pageSize) => {
    console.log(currentPage + " " + pageSize);
    try {
        const response = await request({
            method: 'get',
            url: `news/getNewsInPage?page=${currentPage}&pageSize=${pageSize}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("123 " + response);
        return response;
    } catch (e) {
        return e;
    }
}

export const GetNewsByAccountService = async (accountId) => {
    try {
        const response = await request({
            method: "get",
            url: `news/getNewsByAccount?accountId=${accountId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (e) {
        return e;
    }
}
import request from '../utils/request';

const END_POINTS = {
    GET_ALL_POST: 'forum/getAllPost',
    GET_BY_ID: 'forum/getCommentByPost',
    ADD_POST: 'forum/addPost',
    EDIT_POST: 'forum/editPost',
    // GET_APPROVE_BY_SUBJECT: 'post/GetApprovedPostBySubject',
    // GET_BY_SUBJECT: 'post/GetPostBySubject',
    // GET_BY_STATUS: 'post/GetPostByStatus',
    // GET_BY_SUBJECT_STATUS: 'post/GetPostBySubjectAndStatus',
    // CHANGE_POST_STATUS: 'post/ChangeStatusPost',
    LIKE_POST: '/forum/actionlikepost',
    // UNLIKE_POST: '/post/UnlikePost',
    DELETE_POST: '/forum/DeletePost',
    // SAVE_POST: '/post/SavePost',
    // UNSAVE_POST: '/post/UnSavePost',
    GET_SAVED_POST: '/forum/GetAllPostSaved',
    ADD_COMMENT: '/forum/addcommentPost'
};

export const getAllPostService = async () => await request.get(END_POINTS.GET_ALL_POST);

export const getPostByIdService = async (idPost) => await request.get(`${END_POINTS.GET_BY_ID}?postId=${idPost}`);

export const addPostService = async (data) => await request.post(END_POINTS.ADD_POST, data);

export const editPostService = async (idPost, data) =>  await request.post(`${END_POINTS.EDIT_POST}?idPost=${idPost}`, data);

// export const addCommentService = async (idPost, data) =>  await request.post(`${END_POINTS.ADD_COMMENT}?idPost=${idPost}`, data);

export const getApprovedPostBySubjectService = async (subjectId) => await request.get(`${END_POINTS.GET_APPROVE_BY_SUBJECT}?subjectId=${subjectId}`);

export const getPostBySubjectService = async (subjectId, accountId) =>
    await request.get(`${END_POINTS.GET_BY_SUBJECT}?subjectId=${subjectId}&accountId=${accountId}`);

export const getPostByStatusService = async (status, accountId) =>
    await request.get(`${END_POINTS.GET_BY_STATUS}?status=${status}&accountId=${accountId}`);

export const getPostBySubjectAndStatusService = async (subjectId, status, accountId) =>
    await request.get(`${END_POINTS.GET_BY_SUBJECT_STATUS}?subjectId=${subjectId}&status=${status}&accountId=${accountId}`);

export const deletePostService = async (idPost) => await request.post(`${END_POINTS.DELETE_POST}?idPost=${idPost}`);

export const changePostStatusService = async (idPost, status) => await request.post(`${END_POINTS.CHANGE_POST_STATUS}?idPost=${idPost}&status=${status}`);

export const likePostService = async (idPost, accountId) => await request.post(`${END_POINTS.LIKE_POST}?postId=${idPost}&userId=${accountId}`);

export const unlikePostService = async (idPost, accountId) => await request.delete(`${END_POINTS.UNLIKE_POST}?idPost=${idPost}&accountId=${accountId}`);

export const savePostService = async (idPost, accountId) => await request.post(`${END_POINTS.SAVE_POST}?idPost=${idPost}&accountId=${accountId}`);

export const unSavePostService = async (idPost, accountId) => await request.delete(`${END_POINTS.UNSAVE_POST}?idPost=${idPost}&accountId=${accountId}`);

export const getSavedPostService = async (accountId) => await request.get(`${END_POINTS.GET_SAVED_POST}?userId=${accountId}`);

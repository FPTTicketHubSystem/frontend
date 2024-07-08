import request from '../utils/request';

const END_POINTS = {
    ADD_COMMENT: '/forum/addcommentPost',
    GET_BY_POST: '/forum/getCommentByPost',
    EDIT_COMMENT: 'forum/editComment',
    DELETE_COMMENT: 'forum/deleteComment'
};

export const addCommentService = async (data) => await request.post(`${END_POINTS.ADD_COMMENT}?postId=${data.postId}`, data);

export const getCommentsByPostService = async (postId) =>
    await request.get(`${END_POINTS.GET_BY_POST}?postId=${postId}`);

export const editCommentService = async (idComment, content) => await  request.post(`${END_POINTS.EDIT_COMMENT}?idComment=${idComment}&content=${content}`);

export const deleteCommentService = async (idComment) => await request.post(`${END_POINTS.DELETE_COMMENT}?idComment=${idComment}`);

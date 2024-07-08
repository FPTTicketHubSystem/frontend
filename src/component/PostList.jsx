import { useNavigate, useSearchParams } from "react-router-dom";
import PostContent from "./ForumComponent/PostContent";
import SendComment from "./ForumComponent/SendComment";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Button, Modal, notification } from "antd";
import { PostContext } from "../context/PostContext";
import PostForm from "./ForumComponent/PostForm";
import CommentList from "./CommentList";

const PostList = ({ posts }) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchParams] = useSearchParams();
	const [currentPost, setCurrentPost] = useState({...posts[0], Status: "Đang diễn ra"})
  const navigate = useNavigate();
  const statusQueryParams = searchParams.get("status");
  const { user } = useContext(UserContext);
  const { getAllPost, getPostByStatus, changePostStatus, deletePost } =
    useContext(PostContext);

	const showEditForm = () => {setOpenEditForm(!openEditForm)}

  const showModal = (post) => {
    setOpenConfirmDelete(true);
    setSelectedPost(post);
  };

  const cancelModal = () => {
    setOpenConfirmDelete(false);
  };

  //Display notification
  const [api, contextHolder] = notification.useNotification();
  const openNotificationApprovedPost = (placement) => {
    api.success({
      message: "Thông báo",
      description: "Bài viết đã được phê duyệt !",
      placement,
    });
  };

  const openNotificationRejectedPost = (placement) => {
    api.error({
      message: "Thông báo",
      description: "Bài viết đã bị từ chối !",
      placement,
    });
  };

  const openNotificationDeletedPost = (placement) => {
    api.success({
      message: "Thông báo",
      description: "Bài viết đã được xóa thành công !",
      placement,
    });
  };

  const handleApprovedPost = async (post) => {
    await changePostStatus(post.postId, "Approved");
    navigate("/admin/manageForum?status=Approved");
    openNotificationApprovedPost("topRight");
  };

  const handleRejectedPost = async (post) => {
    await changePostStatus(post.postId, "Rejected");
    navigate("/admin/manageForum?status=Rejected");
    openNotificationRejectedPost("topRight");
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
    if (statusQueryParams) {
      getPostByStatus(statusQueryParams, user.accountId);
    } else {
      getAllPost();
    }
    cancelModal();
    openNotificationDeletedPost("topRight");
  };

  return (
    <div className="post">
      {contextHolder}
			<PostForm open={openEditForm} post={currentPost} setOpen={setOpenEditForm} showEditForm={showEditForm} />
      {posts?.length > 0 ? (
        posts.map((post) => (
          <div key={post.postId} className="form-post">
            <PostContent post={post} />
            {(!statusQueryParams ||
              statusQueryParams === "Saved") && (
              <>
                <SendComment post={post} />
              </>
            )}
            <CommentList idPost={post.postId} />
            {user && user.accountId === post.accountId && ( 
            <Button
              className="edit-post-btn me-2"
              type="primary"
              onClick={showEditForm}
            >
              Sửa bài
            </Button>
             )}
            {user && user.accountId === post.accountId && ( 
            <Button
              className="delete-post-btn"
              type="primary"
              danger
              onClick={() => showModal(post)}
            >
              Xóa bài
            </Button>
            )}
            <Modal
              title="Xác nhận"
              open={openConfirmDelete}
              okText="Đồng ý"
              cancelText="Hủy bỏ"
              onOk={() => handleDeletePost(selectedPost?.postId)}
              onCancel={cancelModal}
              className="confirm-delete-modal"
            >
              <h3>Bạn có đồng ý xóa bài viết này?</h3>
            </Modal>
          </div>
        ))
      ) : (
        <h3 className="post-empty">Không tìm thấy bài viết nào !</h3>
      )}
    </div>
  );
};

export default PostList;

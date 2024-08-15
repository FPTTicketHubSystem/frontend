import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import { Button, Modal, notification } from "antd";
import PostContent from "./PostContent";
import SendComment from "./SendComment";

const PostList = ({ posts }) => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const statusQueryParams = searchParams.get("status");
  const { user } = useContext(UserContext);
  const { getAllPost, getPostByStatus, changePostStatus, deletePost } =
    useContext(PostContext);

  const showModal = (post) => {
    setOpen(true);
    setSelectedPost(post);
  };

  const cancelModal = () => {
    setOpen(false);
  };

  //Display notification
  const [api, contextHolder] = notification.useNotification();
  // const openNotificationApprovedPost = (placement) => {
  //   api.success({
  //     message: "Thông báo",
  //     description: "Bài viết đã được phê duyệt !",
  //     placement,
  //   });
  // };

  // const openNotificationRejectedPost = (placement) => {
  //   api.error({
  //     message: "Thông báo",
  //     description: "Bài viết đã bị từ chối !",
  //     placement,
  //   });
  // };

  const openNotificationDeletedPost = (placement) => {
    api.success({
      message: "Thông báo",
      description: "Bài viết đã được xóa thành công !",
      placement,
    });
  };

  // const handleApprovedPost = async (post) => {
  //   await changePostStatus(post.postId, "Đã duyệt");
  //   navigate("/admin/manageForum?status=Đã duyệt");
  //   openNotificationApprovedPost("topRight");
  // };

  // const handleRejectedPost = async (post) => {
  //   await changePostStatus(post.postId, "Rejected");
  //   navigate("/admin/manageForum?status=Rejected");
  //   openNotificationRejectedPost("topRight");
  // };

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
    <div className="container my-4">
      {contextHolder}
      {posts?.length > 0 ? (
        posts.map((post) => (
          <div key={post.postId} className="card shadow-sm mb-4">
            <div className="card-body">
              <PostContent post={post} />

              {(!statusQueryParams ||
                (statusQueryParams === "Đã duyệt" && user.roleId !== 2) ||
                statusQueryParams === "Đã lưu") && (
                <div className="mt-3">
                  <SendComment post={post} />
                </div>
              )}

              <div className="mt-3">
                {!statusQueryParams && post.accountId === user.accountId && (
                  <Button
                    className="btn btn-danger"
                    onClick={() => showModal(post)}
                  >
                    Xóa bài
                  </Button>
                )}
                {statusQueryParams === "Đã duyệt" && (
                  <Button
                    className="btn btn-danger"
                    onClick={() => showModal(post)}
                  >
                    Xóa bài
                  </Button>
                )}
                {statusQueryParams === "Chờ duyệt" && user.roleId == 4 && (
                  <Button
                    className="btn btn-danger"
                    onClick={() => showModal(post)}
                  >
                    Xóa bài
                  </Button>
                )}
                {/* {statusQueryParams === "Chờ duyệt" && user.roleId == 2 && (
                  <div className="d-flex gap-2">
                    <Button
                      className="btn btn-success"
                      onClick={() => handleApprovedPost(post)}
                    >
                      Đồng ý
                    </Button>
                    <Button
                      className="btn btn-warning"
                      onClick={() => handleRejectedPost(post)}
                    >
                      Từ chối
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={() => showModal(post)}
                    >
                      Xóa bài
                    </Button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info" role="alert">
          Không tìm thấy bài viết nào !
        </div>
      )}

      <Modal
        title="Xác nhận"
        open={open}
        okText="Đồng ý"
        cancelText="Hủy bỏ"
        onOk={() => handleDeletePost(selectedPost?.postId)}
        onCancel={cancelModal}
        className="modal"
      >
        <h5 className="text-center">Bạn có đồng ý xóa bài viết này?</h5>
      </Modal>
    </div>
  );
};

export default PostList;

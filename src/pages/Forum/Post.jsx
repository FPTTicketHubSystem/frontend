const defaultAvatar = "../avatar.png";
const like = "../like.png";
const liked = "../liked.png";
const save = "../Image/Forum/luu.png";
const saved = "../Image/Forum/daluu.png";
const comment = "../Image/Forum/comment.png";

export default function PostContent({ post }) {
  const {
    postId,
    avatar,
    fullName,
    createdTime,
    postText,
    postFile,
    status,
    postlikes,
    postfavourites,
    countComment,
    countLike,
  } = post || {};

  const {
    getAllPost,
    currentPost,
    getPostById,
    getPostByStatus,
    likePost,
    unlikePost,
    savePost,
    unSavePost,
    getSavedPost,
  } = useContext(PostContext);
  const { comments, getCommentsByPost } = useContext(CommentContext);
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const statusQueryParams = searchParams.get("status");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [messageModal, setMessageModal] = useState("");

  const userLiked = postlikes?.find(
    (like) => like.accountId === user?.accountId
  );
  const userSaved = postfavourites?.find(
    (postfavourite) => postfavourite.accountId === user?.accountId
  );

  const showModal = useCallback(
    (postId) => {
      setIsModalOpen(true);
      getPostById(postId);
      getCommentsByPost(postId);
    },
    [getPostById, getCommentsByPost]
  );

  const cancelModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const showLoginModal = useCallback(() => {
    setIsLoginOpen(true);
  }, []);

  const cancelLoginModal = useCallback(() => {
    setIsLoginOpen(false);
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationSavePostSuccess = useCallback(
    (placement) => {
      api.success({
        message: "Thông báo",
        description: "Lưu bài viết thành công !",
        placement,
      });
    },
    [api]
  );

  const openNotificationUnSavePostSuccess = useCallback(
    (placement) => {
      api.success({
        message: "Thông báo",
        description: "Bỏ lưu bài viết thành công !",
        placement,
      });
    },
    [api]
  );

  const handleLikedClick = useCallback(async () => {
    if (user) {
      if (!userLiked) {
        await likePost(postId, user.accountId);
      } else {
        await unlikePost(postId, user.accountId);
      }

      if (statusQueryParams) {
        if (statusQueryParams === "Saved") {
          await getSavedPost(user.accountId);
        } else {
          await getPostByStatus(statusQueryParams, user.accountId);
        }
      } else {
        await getAllPost();
      }
    } else {
      showLoginModal();
      setMessageModal("like");
    }
  }, [
    user,
    userLiked,
    postId,
    statusQueryParams,
    likePost,
    unlikePost,
    getSavedPost,
    getPostByStatus,
    getAllPost,
    showLoginModal,
  ]);

  const handleSaveClick = useCallback(async () => {
    if (user) {
      if (!userSaved) {
        await savePost(postId, user.accountId);
        openNotificationSavePostSuccess("topRight");
      } else {
        await unSavePost(postId, user.accountId);
        openNotificationUnSavePostSuccess("topRight");
      }

      if (statusQueryParams) {
        if (statusQueryParams === "Saved") {
          await getSavedPost(user.accountId);
        } else {
          await getPostByStatus(statusQueryParams, user.accountId);
        }
      } else {
        await getAllPost();
      }
    } else {
      showLoginModal();
      setMessageModal("lưu");
    }
  }, [
    user,
    userSaved,
    postId,
    statusQueryParams,
    savePost,
    unSavePost,
    getSavedPost,
    getPostByStatus,
    getAllPost,
    showLoginModal,
    openNotificationSavePostSuccess,
    openNotificationUnSavePostSuccess,
  ]);

  if (!post) {
    return null; // or some loading indicator
  }

  return (
    <>
      {contextHolder}
      <div className="form-info">
        <div className="form-left">
          <Avatar
            src={
              <img
                src={avatar || defaultAvatar}
                alt="avatar"
                className="avatar"
              />
            }
          />
        </div>
        <div className="form-mid">
          <div className="form-mid-top">
            <div>
              {fullName} • {createdTime}
            </div>
            <div className="form-mid-top-subject">
              <p>{subjectName}</p>
            </div>
          </div>
          <div className="form-mid-content">
            <div>
              <p>{postText}</p>
            </div>
            {postFile && <img src={postFile} alt="post" />}
          </div>
        </div>
        <div className="form-right">
          <img
            src={userSaved ? saved : save}
            onClick={handleSaveClick}
            alt="save"
          />
        </div>
      </div>
      {status === "Approved" && (
        <div className="form-like">
          <img
            onClick={handleLikedClick}
            src={userLiked ? liked : like}
            alt="heart"
          />
          <p>{countLike}</p>
          <img src={comment} onClick={() => showModal(postId)} alt="comment" />
          <p>{countComment}</p>
        </div>
      )}

      <Modal
        title={`Bài viết của ${fullName}`}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
        open={isModalOpen}
        onCancel={cancelModal}
        className="comment-modal"
      >
        <PostDetails data={currentPost} />
        {comments.length > 0 ? (
          <>
            <h6 className="comment-title">Bình luận</h6>
            <CommentList comments={comments} />
          </>
        ) : (
          <h6 className="comment-title-empty"> Chưa có bình luận nào !</h6>
        )}
      </Modal>

      <Modal
        title={`${
          messageModal.charAt(0).toUpperCase() + messageModal.slice(1)
        } bài viết`}
        open={isLoginOpen}
        okText="Đồng ý"
        cancelText="Hủy bỏ"
        onCancel={cancelLoginModal}
        onOk={() => navigate("/login")}
      >
        <h5>Vui lòng đăng nhập để {messageModal} bài viết !</h5>
      </Modal>
    </>
  );
}

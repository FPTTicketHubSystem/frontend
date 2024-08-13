import "bootstrap/dist/css/bootstrap.css";
import { useContext, useEffect } from "react";
import { PostContext } from "../../context/PostContext";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Header from "../../component/Header";
import CreatePost from "./CreatePost";
import { Spinner } from "react-bootstrap";
import PostList from "./PostList";
import "../../assets/css/Forum.css";

export default function Forum() {
  const { loading, posts, getAllPost, getPostByStatus, getSavedPost } =
    useContext(PostContext);
  const { user } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const statusQueryParam = searchParams.get("status");
  //   const statusList = [
  //     {
  //       id: 1,
  //       title: "Tất cả bài viết",
  //     },
  //     {
  //       id: 2,
  //       name: "Approved",
  //       title: "Bài viết của tôi",
  //     },
  //     {
  //       id: 3,
  //       name: "Pending",
  //       title: "Chờ phê duyệt",
  //     },
  //     {
  //       id: 4,
  //       name: "Rejected",
  //       title: "Bị từ chối",
  //     },
  //     {
  //       id: 5,
  //       name: "Saved",
  //       title: "Đã lưu",
  //     },
  //   ];

  //get post list
  useEffect(() => {
    if (statusQueryParam) {
      if (statusQueryParam === "Đã duyệt") getSavedPost(user.accountId);
      else getPostByStatus(statusQueryParam, user.accountId);
    } else getAllPost();
  }, [statusQueryParam, user.accountId]);

  return (
    <>
      <Header />
      <div className="body-forum">
        <div className="container">
          <CreatePost />
          <div className="post-filter-container"></div>
          <div className="post-container">
            {loading ? <Spinner /> : <PostList posts={posts} />}
          </div>
        </div>
      </div>
    </>
  );
}

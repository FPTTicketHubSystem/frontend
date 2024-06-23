import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import '../../../src/assets/css/forum.css';
import { TrafficDataService } from '../../services/ForumService';

function Forum() {
    const [userid, setUserid] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [expandedPosts, setExpandedPosts] = useState({});

    const fetchPosts = async () => {
        try {
          const response = await TrafficDataService();
          console.log("ssss",response)
          setPosts(response); // Assuming response contains the array of posts
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("userid", userid);
        formData.append("content", content);
        formData.append("date", date);
        formData.append("imageFile", imageFile);

        try {
            const response = await fetch("/Forum/CreatePost", {  
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            if (data.success) {
                // Clear form and refresh posts
                setUserid("");
                setContent("");
                setDate("");
                setImageFile(null);
                fetchPosts();
                reloadPage();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const reloadPage = () => {
        window.location.reload();
    };

    const toggleContent = (postId) => {
        setExpandedPosts(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const handleDelete = async (postId) => {
        try {
            const response = await fetch(`/Forum/DeletePost?postId=${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postId })
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            if (data.success) {
                // Refresh posts
                fetchPosts();
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const [editingPostId, setEditingPostId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [editImage, setEditImage] = useState(null);

    const handleEdit = (post) => {
        setEditingPostId(post.PostId);
        setEditContent(post.PostContent);
    };

    const handleEditImageChange = (e) => {
        setEditImage(e.target.files[0]);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('postId', editingPostId);
        formData.append('content', editContent);
        if (editImage) {
            formData.append('imageFile', editImage);
        }

        try {
            console.log(editContent)
            const response = await fetch(`/Forum/EditPost?postId=${editingPostId}&content=${editContent}&imageFile=${editImage}`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                // Refresh posts
                fetchPosts();
                setEditingPostId(null);
                setEditContent('');
                setEditImage(null);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };
    const [filterDate, setFilterDate] = useState("");
    const [filterUserId, setFilterUserId] = useState("");
    const fetchPostsa = async (date = "", userId = "") => {
        try {
            const queryParams = new URLSearchParams();
            if (date) queryParams.append("date", date);
            if (userId) queryParams.append("idUser", userId);
            console.log(filterDate)
            const response = await fetch(`/Forum/FindPost?date=${filterDate}&idUser=${filterUserId}`);
            if (!response.ok) {
                const response = await fetch(`/Forum/FindPost?idUser=${filterUserId}`);
            }
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchPostsa(filterDate, filterUserId);
    };
    return (
        <>
            <Header />
            <section className="about spad">
                <div className="container">
                    <div className="row">
                        <div className="about__text">
                            <div className="form-container">
                                <form onSubmit={handleSubmit} className="form-content">
                                    <div className="title_post">
                                        <p className="title_post_context">Tao Bai Viet</p>
                                    </div>
                                    <textarea
                                        placeholder="Content"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        className="form-textarea"
                                    />
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".jpg,.jpeg,.png"
                                        className="form-input"
                                    />
                                    <button type="submit" className="primary-btn">Dang</button>
                                </form>
                            </div>
                        <div className="filter-container">
                            <form onSubmit={handleFilterSubmit} className="filter-form">
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="form-input"
                                />
                                <input
                                    type="number"
                                    placeholder="User ID"
                                    value={filterUserId}
                                    onChange={(e) => setFilterUserId(e.target.value)}
                                    className="form-input"
                                />
                                <button type="submit" className="primary-btn">Filter</button>
                            </form>
                        </div>
                            <div className="posts-container">
                                {posts.map((post) => (
                                <div key={post.postId} className="post">
                                <div key={post.postId} className="text">
                                <div className="ticket-content forum-context">
                                <div className="info mb-5">
                                    <p className="title titles h4 text-white mt-4 mb-1">
                                    {post.fullName}
                                    </p>
                                    <p className="date">
                                    <i className="bi bi-calendar3 me-2"></i>{post.createDate}
                                    </p>
                                </div>
                                <div className="price mt-5">
                                    <div id="ticket-price" className="d-flex align-items-center">
                                    <div className={`post-content ${expandedPosts[post.postId] ? 'show' : ''}`}>
                                                                {post.postText}
                                                            </div>
                                    </div>
                                    <div className="btn mt-2 forum-buy" id="buy-btn">
                                    <a
                                        href="#buy"
                                        className="text-white"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Đặt vé ngay{" "}
                                    </a>
                                    </div>
                                </div>
                                </div>
                                <div class="heart-icon"></div>
                                </div>
                                        {/* <p>{post.fullName}</p>
                                        <p>{post.createDate}</p>
                                        <div className={`post-content ${expandedPosts[post.postId] ? 'show' : ''}`}>
                                            {post.postText}
                                        </div>
                                        {post.postText.length > 200 && (
                                            <span
                                                className="show-more"
                                                onClick={() => toggleContent(post.postId)}
                                            >
                                                {expandedPosts[post.postId] ? 'Show less' : 'Show more'}
                                            </span>
                                        )}
                                        {post.postFile && (
                                            <img src={`https://www.constructionweekonline.com/cloud/2021/07/07/img-worlds-of-adventure.jpg`} alt="Post" className="post-image" />
                                        )}
                                        <button onClick={() => handleDelete(post.postId)} className="delete-btn">
                                            Delete
                                        </button>
                                        <button onClick={() => handleEdit(post)} className="edit-btn">
                                            Edit
                                        </button>
                                        <div className="x1n2onr8">
                                            <div>like</div>
                                        </div> */}
                                        <div className="ticket-image">
                                            <img
                                            className="post-image"
                                            src={`https://www.constructionweekonline.com/cloud/2021/07/07/img-worlds-of-adventure.jpg`}
                                            alt="Banner cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {editingPostId && (
                                <div className="edit-form-container">
                                    <form onSubmit={handleEditSubmit} className="edit-form-content">
                                        <textarea
                                            placeholder="Edit Content"
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            required
                                            className="form-textarea"
                                        />
                                        <input
                                            type="file"
                                            onChange={handleEditImageChange}
                                            accept=".jpg,.jpeg,.png"
                                            className="form-input"
                                        />
                                        <button type="submit" className="primary-btn">Update</button>
                                        <button onClick={() => setEditingPostId(null)} className="secondary-btn">Cancel</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Forum;

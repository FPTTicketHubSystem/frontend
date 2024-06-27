import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import '../../../src/assets/css/forum.css';
import { TrafficDataService, AddPost, DeletePost, EditPost } from '../../services/ForumService';
import { imageDb } from '../../services/FirebaseConfig';
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
function Forum() {

    const [postText, setPostText] = useState("");
    const [postFile, setPostFile] = useState(null);   
    const [posts, setPosts] = useState([]);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [editingPostId, setEditingPostId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [editImage, setEditImage] = useState(null);
    const [filterDate, setFilterDate] = useState("");
    const [filterUserId, setFilterUserId] = useState("");
    const [showForm, setShowForm] = useState(false); 
    const [showEditForm, setShowEditForm] = useState(false); 
    const fetchPosts = async () => {
        try {
            const response = await TrafficDataService();
            console.log(response, "___sa")
            setPosts(response); 
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
      
    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleClick()
        console.log(imgUrl, "___s")
        let formData = new FormData();
        formData.append("postText", postText);
        formData.append("postFile", imgUrl);
        formData.append("createDate", "2024-06-24T14:13:57.919Z");
        formData.append("status", "string");

        let jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });

        if (jsonObject.hasOwnProperty('createDate')) {
            jsonObject['createDate'] = new Date(jsonObject['createDate']).toISOString();
        }

        try {
            const response = await AddPost(jsonObject);
            setShowForm(false);
            fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
    
    const handleFileChange = (e) => {
        setPostFile(e.target.files[0]);
    };

    const handleEdit = (post) => {
        setEditingPostId(post.postId);
        setEditContent(post.postText);
        setShowEditForm(true); // Show the edit form as a popup
    };

    const handleEditImageChange = (e) => {
        setEditImage(e.target.files[0]);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (img !== null) {
            const imgRef = ref(imageDb,`files/${v4()}`)
            uploadBytes(imgRef, img, { contentType: img.type })
              .then((snapshot) => {
                console.log(snapshot);
      
                return getDownloadURL(snapshot.ref);
              })
              .then((url) => {
                console.log("File available at", url);
      
                setImgUrl((prevData) => [...prevData, url]);
              
              })
              .catch((error) => {
                console.error("Upload failed:", error);
              });
          }
        const formData = new FormData();
        formData.append('postId', editingPostId);
        formData.append('postText', editContent);
        formData.append('postFile', imgUrl);
        formData.append('status', "");

        if (editImage) {
            formData.append('imageFile', editImage);
        }

        let jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });
        // setImgUrl('')
        if (jsonObject.hasOwnProperty('createDate')) {
            jsonObject['createDate'] = new Date(jsonObject['createDate']).toISOString();
        }

        try {
            const response = await EditPost(editingPostId, jsonObject);
            if (response.success) {
                setPosts(posts.map(post => post.postId === editingPostId ? { ...post, postText: editContent, postFile: editImage } : post));
                setShowEditForm(false); // Hide the edit form popup
                window.location.reload()
            } else {
                console.error(response.message); 
            }
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            const response = await DeletePost(postId);
            if (response.success) {
                setPosts(posts.filter(post => post.postId !== postId));
                window.location.reload()
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const fetchPostsa = async (date = "", userId = "") => {
        try {
            const queryParams = new URLSearchParams();
            if (date) queryParams.append("date", date);
            if (userId) queryParams.append("idUser", userId);
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

    const toggleForm = () => {
        setShowForm(!showForm); 
    };

    const closeEditForm = () => {
        setShowEditForm(false); // Close the edit form popup
    };

    const [img,setImg] =useState('')
    const [imgUrl,setImgUrl] =useState([])
    
      const handleClick = () => {
        if (img !== null) {
          const imgRef = ref(imageDb,`files/${v4()}`)
          uploadBytes(imgRef, img, { contentType: img.type })
            .then((snapshot) => {
              console.log(snapshot);
    
              return getDownloadURL(snapshot.ref);
            })
            .then((url) => {
              console.log("File available at", url);
    
              setImgUrl((prevData) => [...prevData, url]);
            
            })
            .catch((error) => {
              console.error("Upload failed:", error);
            });
        }
      };

    return (
        <>
            <Header />
            <section className="about spad">
                <div className="container">
                    <div className="row">
                        <div className="about__text">
                            <div className="form-container">
                                <input
                                    readOnly
                                    placeholder="Bạn đang nghĩ gì"
                                    onClick={toggleForm} 
                                    className="popup-trigger"
                                />
                                <div className={`popup-form ${showForm ? 'active' : ''}`}>
                                    <form onSubmit={handleSubmit} className="form-content">
                                        <div className="title_post">
                                            <p className="title_post_context">Tạo Bài Viết</p>
                                        </div>
                                        <textarea
                                            placeholder="Nội dung bài viết"
                                            value={postText}
                                            onChange={(e) => setPostText(e.target.value)}
                                            required
                                            className="form-textarea"
                                        ></textarea>
                                        <input
                                            type="file"
                                            onChange={(e)=>setImg(e.target.files[0])} 
                                            accept=".jpg,.jpeg,.png"
                                            className="form-input"
                                        />
                                        <button type="submit" className="primary-btn">
                                            Đăng
                                        </button>
                                        <button type="button" onClick={() => setShowForm(false)} className="close-btn close-bt-form">Đóng</button>
                                    </form>
                                </div>
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
                                        <div className="infomb-5">
                                            <div>
                                                <p className="title titles h4 text-white mt-4 mb-1">
                                                    {post.fullName}
                                                </p>
                                                <p className="date">
                                                    <i className="bi bi-calendar3 me-2"></i>{post.createDate}
                                                </p>
                                                <div className={`post-content ${expandedPosts[post.postId] ? 'show' : ''}`}>
                                                    {post.postText}
                                                </div>
                                                <img
                                                    className="post-image"
                                                    src={post.postFile}
                                                    alt="Banner cover"
                                                />
                                            </div>
                                            <div id="ticket-price" className="d-flex align-items-center">
                                            </div>
                                            <button onClick={() => handleDelete(post.postId)} className="delete-btn">
                                                Delete
                                            </button>
                                            <button onClick={() => handleEdit(post)} className="edit-btn">
                                                Edit
                                            </button>
                                            <div className="x1n2onr8">
                                                <div>like</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showEditForm && (
                <div className="edit-form-popup">
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
                                className="form-inputs"
                            />
                            <button type="submit" className="primary-btn">
                                Update
                            </button>
                            <button
                                onClick={closeEditForm}
                                className="secondary-btn"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Forum;
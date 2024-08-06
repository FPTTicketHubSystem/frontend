import '../../assets/fonts/icomoon/style.css';
import '../../assets/css/main.css';
import '../../assets/vendor/overlay-scroll/OverlayScrollbars.min.css';
import '../../assets/images/favicon.svg';
import Header from '../../component/Admin/Header';
import Navbar from '../../component/Admin/Navbar';
import React, { useState, useEffect } from 'react';
import { GetAllPost } from '../../services/ForumService';
import { format } from 'date-fns';
import '../../assets/css/ForumAdmin.css';

const ForumAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAllPost();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePostClick = (post) => {
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApprovePost = () => {
    console.log('Post approved:', currentPost);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  const filteredPosts = Array.isArray(posts) ? posts.filter((post) => {
    if (filterStatus !== 'All' && post.status !== filterStatus) {
      return false;
    }
    if (searchTerm && !post.postText.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  }) : [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost).map((post, index) => ({
    ...post,
    index: indexOfFirstPost + index + 1,
  }));

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <div className="app-header d-flex align-items-center">
          <Header />
        </div>

        <Navbar />

        <main className="forum-admin-main">
          <div>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <i className="icon-home lh-1"></i>
                <a href="/" className="text-decoration-none">Home</a>
              </li>
              <li className="breadcrumb-item text-light">Forum</li>
            </ol>
          </div>
          <div className="forum-admin-controls">
            <div className="forum-admin-filters">
              <button className={`filter-btn ${filterStatus === 'All' ? 'active' : ''}`} onClick={() => handleFilterChange('All')}>All</button>
              <button className={`filter-btn ${filterStatus === 'Đã duyệt' ? 'active' : ''}`} onClick={() => handleFilterChange('Đã duyệt')}>Đã duyệt</button>
              <button className={`filter-btn ${filterStatus === 'Chưa duyệt' ? 'active' : ''}`} onClick={() => handleFilterChange('Chưa duyệt')}>Chưa duyệt</button>
            </div>
            <div className="forum-admin-search">
              <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
            </div>
          </div>
          
          <div className="forum-admin-posts">
            {currentPosts.map((post) => (
              <div key={post.postId} className="forum-post-card" onClick={() => handlePostClick(post)}>
                <h3 className="post-title">{post.postText.substring(0, 50)}...</h3>
                <p className="post-author">By: {post.fullName}</p>
                <p className={`post-status ${post.status === 'Đã duyệt' ? 'post-status-approved' : post.status === 'Chưa duyệt' ? 'post-status-pending' : ''}`}>
                  Status: {post.status}
                </p>
                <p className="post-date">Created: {formatDate(post.createDate)}</p>
              </div>
            ))}
          </div>
          
          <div className="forum-admin-pagination">
            {[...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys()].map((number) => (
              <button 
                key={number} 
                className={`page-btn ${currentPage === number + 1 ? 'active' : ''}`} 
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </main>
      </div>

      {showModal && currentPost && (
        <div className="modal-backdrop1">
          <div className="modal-content1">
            <div className="modal-header1">
              <h5 className="modal-title1">Post Details</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body1">
              <div className="modal-body-item1">
                <h6 className="modal-item-title1">Content</h6>
                <p className="modal-item-content1">{currentPost.postText}</p>
              </div>
              <div className="modal-body-item1">
                <h6 className="modal-item-title1">Author</h6>
                <p className="modal-item-content1">{currentPost.fullName}</p>
              </div>
              <div className="modal-body-item1">
                <h6 className="modal-item-title1">Status</h6>
                <p className="modal-item-content1">{currentPost.status}</p>
              </div>
              <div className="modal-body-item1">
                <h6 className="modal-item-title1">Created On</h6>
                <p className="modal-item-content1">{currentPost.createDate ? formatDate(currentPost.createDate) : 'N/A'}</p>
              </div>
            </div>
            <div className="modal-footer1">
              {currentPost.status === 'Chưa duyệt' && (
                <button type="button" className="btn1 btn-approve" onClick={handleApprovePost}>Duyệt</button>
              )}
              <button type="button" className="btn1 btn-secondary1" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumAdmin;

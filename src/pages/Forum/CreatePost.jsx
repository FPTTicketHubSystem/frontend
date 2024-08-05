import React, { useState } from "react";
import styles from "../../assets/css/CreatePost.module.css";
import { AddPost } from "../../services/ForumService";

const CreatePost = ({ onAddPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      AccountId: 1, // Giả sử tài khoản có ID là 1
      PostText: content,
      PostFile: file ? URL.createObjectURL(file) : null, // Giả sử bạn upload file lên và lưu đường dẫn file
    };

    try {
      const response = await AddPost(newPost);
      if (response.status === 200) {
        onAddPost(newPost); // Cập nhật danh sách bài viết trên giao diện nếu cần
        closeModal();
        setSubject("");
        setContent("");
        setFile(null);
      } else {
        console.error("Failed to add post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <>
      <button onClick={openModal} className={styles.createButton}>
        Tạo bài viết
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Tạo bài viết</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Sự kiện:</label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                >
                  <option value="">Chọn sự kiện</option>
                  <option value="Âm nhạc">Âm nhạc</option>
                  <option value="Thể thao">Thể thao</option>
                  <option value="Nghệ thuật">Nghệ thuật</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="content">Nội dung:</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ghi gì đó đi..."
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Ảnh/Video:</label>
                <div className={styles.uploadArea}>
                  <input type="file" onChange={handleFileChange} />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button type="button" onClick={closeModal}>
                  Đóng
                </button>
                <button type="submit">Đăng bài</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;

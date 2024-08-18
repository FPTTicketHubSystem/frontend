import React, { useState } from "react";
import "../assets/css/NewsListPage.css";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";

const sampleNews = [
  {
    id: 1,
    title: "Công nghệ AI mới nhất trong năm 2024",
    summary:
      "Khám phá những tiến bộ đột phá trong lĩnh vực trí tuệ nhân tạo và cách chúng đang thay đổi cuộc sống của chúng ta.",
    imageUrl: "https://groundup.org.za/media/uploads/images/photographers/anton_van_zyl/limpopomirror-avz-20240306.jpeg",
    url: "#",
  },
  {
    id: 2,
    title: "10 xu hướng thiết kế web hàng đầu năm nay",
    summary:
      "Từ thiết kế tối giản đến trải nghiệm 3D, khám phá những xu hướng đang định hình tương lai của thiết kế web.",
    imageUrl: "https://groundup.org.za/media/uploads/images/photographers/anton_van_zyl/limpopomirror-avz-20240306.jpeg",
    url: "#",
  },
  {
    id: 3,
    title: "Cách blockchain đang cách mạng hóa ngành tài chính",
    summary:
      "Tìm hiểu về cách công nghệ blockchain đang thay đổi cách chúng ta nghĩ về tiền tệ và giao dịch tài chính.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/TheNewsTodayCover.jpg/240px-TheNewsTodayCover.jpg",
    url: "#",
  },
  {
    id: 4,
    title: "5 ứng dụng di động phải có trong năm 2024",
    summary:
      "Từ quản lý sức khỏe đến học ngôn ngữ, đây là những ứng dụng di động đang thay đổi cuộc sống hàng ngày của chúng ta.",
    imageUrl: "https://example.com/mobile-apps-image.jpg",
    url: "#",
  },
  {
    id: 5,
    title: "Tương lai của làm việc từ xa: Xu hướng và công nghệ",
    summary:
      "Khám phá cách công nghệ đang định hình tương lai của làm việc từ xa và những thách thức cần vượt qua.",
    imageUrl: "https://example.com/remote-work-image.jpg",
    url: "#",
  },
];

// Thêm nhiều tin tức mẫu hơn để có đủ dữ liệu cho phân trang
for (let i = 6; i <= 20; i++) {
  sampleNews.push({
    id: i,
    title: `Tin tức số ${i}`,
    summary: `Đây là tóm tắt cho tin tức số ${i}. Nó chứa thông tin ngắn gọn về nội dung bài viết.`,
    imageUrl: `https://example.com/image-${i}.jpg`,
    url: "#",
  });
}

const NewsListPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleNews.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sampleNews.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReadMore = (id) => {
    navigate(`/news-detail/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="news-list-container">
        <h1 className="news-list-title">Tin mới nhất</h1>
        <div className="news-list">
          {currentItems.map((item) => (
            <div key={item.id} className="news-item">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="news-image"
              />
              <div className="news-content">
                <h2 className="news-title">{item.title}</h2>
                <div className="news-summary-container">
                  <p className="news-summary">{item.summary}</p>
                </div>
                <div className="news-link-container">
                  <button
                    onClick={() => handleReadMore(item.id)}
                    className="news-link"
                  >
                    Đọc thêm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsListPage;

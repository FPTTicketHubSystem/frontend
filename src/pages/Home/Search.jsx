import React from 'react';
import '../../assets/css/search.css';
import Header from "../../component/Header";
import Footer from "../../component/Footer";


const Search = () => {
  return (
    <>
    {/* <Header/> */}
    <div className="custom-search-container">
    <div className="custom-overlay">
      <div className="custom-search-box">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Sự kiện bạn muốn tìm kiếm?"
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mt-3">
          <span className="input-group-text" id="basic-addon2">
            <i className="bi bi-geo-alt"></i>
          </span>
          <select className="form-select" aria-label="Location">
            <option value="toanquoc">Toàn Quốc</option>
            <option value="toanquoc">Hà Nội</option>
            <option value="toanquoc">Đà Nẵng</option>
            <option value="toanquoc">Quy Nhơn</option>
            <option value="toanquoc">TP. Hồ Chí Minh</option>
          </select>
        </div>
        <button className="btn btn-primary mt-3">Tìm kiếm</button>
      </div>
    </div>
  </div>
  <div className="custom-search-results mt-4">
            <div className="d-flex flex-wrap align-items-center">
              <span className="text-success me-2">Kết quả tìm kiếm:</span>
              <button className="btn btn-outline-secondary btn-sm me-2">Tất cả</button>
              <button className="btn btn-outline-secondary btn-sm me-2">Nhạc sống</button>
              <button className="btn btn-outline-secondary btn-sm me-2">Sân khấu & Nghệ thuật</button>
              <button className="btn btn-outline-secondary btn-sm me-2">Thể thao</button>
              <span className="text-success ms-auto">Thiết lập lại</span>
            </div>
          </div>
  
    </>
    
  );
};

export default Search;

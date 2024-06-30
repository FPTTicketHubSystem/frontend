import React, { useState } from 'react';

function App() {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="app">
      <div className="background">
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <input type="text" placeholder="Toàn Quốc" className="location-input" />
          <button className="search-button">Tìm kiếm</button>
        </div>
        <div className="filters">
          <span className="filter-label">Kết quả tìm kiếm:</span>
          <button className="filter-button active">Tất cả</button>
          <button className="filter-button">Nhạc sống</button>
          <button className="filter-reset">Thiết lập lại</button>
        </div>
        <div className="filter-dropdown">
          <button className="filter-toggle" onClick={toggleFilters}>
            Bộ lọc
            <span className={showFilters ? "arrow up" : "arrow down"}></span>
          </button>
          {showFilters && (
            <div className="filter-options">
              <label>
                <input type="checkbox" name="option1" /> Option 1
              </label>
              <label>
                <input type="checkbox" name="option2" /> Option 2
              </label>
              <label>
                <input type="checkbox" name="option3" /> Option 3
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

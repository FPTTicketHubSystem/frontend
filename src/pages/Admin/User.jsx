import React, { useState } from 'react';
import '../../assets/fonts/icomoon/style.css';
import '../../assets/css/main.css';
import '../../assets/vendor/overlay-scroll/OverlayScrollbars.min.css';
import '../../assets/images/favicon.svg';
import Duc from '../../assets/images/user/Duc.jpg';
import Header from '../../component/Admin/Header';
import Navbar from '../../component/Admin/Navbar';
import LockButton from '../../component/Admin/LockButton';
import EditButton from '../../component/Admin/EditButton';
import ConfirmButton from '../../component/Admin/ConfirmButton';
import CancelButton from '../../component/Admin/CancelButton';

const User = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Pham Phu Duc',
      email: 'duc@fpt.edu.vn',
      password: '••••••',
      status: 'Online',
      phone: '0900009900',
      gender: 'Nam',
      gold: 0,
      avatar: Duc,
      isLocked: false,
    },
  

  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Số người dùng trên mỗi trang
  const [filterStatus, setFilterStatus] = useState('All'); // Trạng thái để lọc người dùng

  // Hàm để xử lý thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm để xử lý thay đổi trạng thái khóa
  const handleLockChange = (id, newLockStatus) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, isLocked: newLockStatus } : user
    );
    setUsers(updatedUsers);
  };

  // Hàm để xử lý lọc người dùng theo trạng thái
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi bộ lọc
  };

  // Lọc người dùng dựa trên trạng thái
  const filteredUsers = users.filter(user => {
    if (filterStatus === 'All') {
      return true;
    }
    return user.status === filterStatus;
  });

  // Tính chỉ mục bắt đầu và chỉ mục kết thúc của người dùng trên trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <div className="app-header d-flex align-items-center">
          <Header />
        </div>

        <Navbar />

        <div className="app-body">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-6">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item">
                        <i className="icon-home lh-1"></i>
                        <a href="/" className="text-decoration-none">Home</a>
                      </li>
                      <li className="breadcrumb-item text-light">User</li>
                    </ol>
                  </div>
                  <div className="btn-group">
                    <button
                      className={`btn ${filterStatus === 'All' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleFilterChange('All')}
                    >
                      All
                    </button>
                    <button
                      className={`btn ${filterStatus === 'Online' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleFilterChange('Online')}
                    >
                      Online
                    </button>
                    <button
                      className={`btn ${filterStatus === 'Offline' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleFilterChange('Offline')}
                    >
                      Offline
                    </button>
                    <button
                      className={`btn ${filterStatus === 'Pending' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleFilterChange('Pending')}
                    >
                      Pending
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card mb-2">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped align-middle m-0">
                        <thead>
                          <tr>
                            <th>id</th>
                            <th></th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Mật khẩu</th>
                            <th>Trạng thái</th>
                            <th>Số điện thoại</th>
                            <th>Giới tính</th>
                            <th>Gold</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentUsers.map(user => (
                            <tr key={user.id}>
                              <td>{user.id}</td>
                              <th>
                                <input className="form-check-input" type="checkbox" value="option1" />
                              </th>
                              <td>
                                <img src={user.avatar || Duc} className="me-2 img-3x rounded-3" alt="avt" />
                                {user.name}
                              </td>
                              <td className="email">{user.email}</td>
                              <td className="password">{user.password}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <i className={`icon-circle1 me-2 fs-5 ${user.isLocked ? "text-light" : "text-success"}`}></i>
                                  {user.isLocked ? "Offline" : "Online"}
                                </div>
                              </td>
                              <td>{user.phone}</td>
                              <td>{user.gender}</td>
                              <td>{user.gold}</td>
                              <td>
                                {/* Hiển thị nút LockButton chỉ khi trạng thái khác "Chờ duyệt" */}
                                {filterStatus !== 'Pending' && (
                                  <>
                                    <EditButton />
                                    <ConfirmButton />
                                    <CancelButton />
                                    <LockButton
                                      isLocked={user.isLocked}
                                      onLockChange={(newLockStatus) => handleLockChange(user.id, newLockStatus)}
                                    />
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                {/* Phân trang */}
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {/* Hiển thị các nút trang */}
                    {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
                      <li key={number} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(number + 1)}>{number + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(filteredUsers.length / usersPerPage) ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
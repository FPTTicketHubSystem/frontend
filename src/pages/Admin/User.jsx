import React, { useState, useEffect } from 'react';
import '../../assets/fonts/icomoon/style.css';
import '../../assets/css/main.css';
import '../../assets/css/editprofile.css';
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
      birthday: '01/01/2001',
      role: 'Người dùng',
      gold: 0,
      avatar: Duc,
      isLocked: false,
    },
    {
      id: 2,
      name: 'Nguyễn Thanh Tùng',
      email: 'MTP@fpt.edu.vn',
      password: '••••••',
      status: 'Offline',
      phone: '0900111222',
      gender: 'Nam',
      birthday: '02/02/2002',
      role: 'Người dùng',
      gold: 0,
      avatar: 'https://th.bing.com/th/id/OIP.Hb2hl5OF1XFHOfUId6Q9qAHaKA?w=196&h=264&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      isLocked: true,
    },
    {
      id: 3,
      name: 'Nguyen Xuan Khiem',
      email: 'Khiem@fpt.edu.vn',
      password: '••••••',
      status: 'Online',
      phone: '0900333444',
      gender: 'Nam',
      birthday: '03/03/2003',
      role: 'Người dùng',
      gold: 0,
      avatar: 'Khiem',
      isLocked: false,
    },
    {
      id: 4,
      name: 'Hoang Thi Lan',
      email: 'lan@fpt.edu.vn',
      password: '••••••',
      status: 'Offline',
      phone: '0900444555',
      gender: 'Nữ',
      birthday: '04/04/2004',
      role: 'Người dùng',
      gold: 0,
      avatar: 'Lan',
      isLocked: true,
    },
    {
      id: 5,
      name: 'Trịnh Trần Phương Tuấn',
      email: 'j97@fpt.edu.vn',
      password: '••••••',
      status: 'Đợi duyệt',
      phone: '0900555666',
      gender: 'Nam',
      birthday: '05/05/2005',
      role: 'Người dùng',
      gold: 0,
      avatar: 'https://th.bing.com/th?id=OSK.26UA3aG0VvTWTj_f3KZ4a6CUIs6ZiVkuCPA0Bw5nAzs&w=155&h=200&c=7&rs=1&o=6&dpr=1.3&pid=SANGAM',
      isLocked: '',
    },
    {
      id: 6,
      name: 'Nguyen Thanh Thao',
      email: 'thao@fpt.edu.vn',
      password: '••••••',
      status: 'Offline',
      phone: '0900666777',
      gender: 'Nữ',
      birthday: '06/06/2006',
      role: 'Người dùng',
      gold: 0,
      avatar: 'Thao',
      isLocked: true,
    },
    {
      id: 7,
      name: 'Tran Quang Nam',
      email: 'nam@fpt.edu.vn',
      password: '••••••',
      status: 'Online',
      phone: '0900777888',
      gender: 'Nam',
      birthday: '07/07/2007',
      role: 'Người dùng',
      gold: 0,
      avatar: 'Nam',
      isLocked: false,
    },
    {
      id: 8,
      name: 'Pham Thi Hoa',
      email: 'hoa@fpt.edu.vn',
      password: '••••••',
      status: 'Đợi duyệt',
      phone: '0900888999',
      gender: 'Nữ',
      birthday: '08/08/2008',
      role: 'Người dùng',
      gold: 0,
      avatar: 'Hoa',
      isLocked: '',
    },
    {
      id: 9,
      name: 'Nguyen Van Tuan',
      email: 'tuan@fpt.edu.vn',
      password: '••••••',
      status: 'Online',
      phone: '0900999000',
      gender: 'Nam',
      birthday: '09/09/2009',
      role: 'Người dùng',
      gold: 0,
      avatar: 'Tuan',
      isLocked: false,
    },
    {
      id: 10,
      name: 'Tran Thi Bich',
      email: 'bich@fpt.edu.vn',
      password: '••••••',
      status: 'Offline',
      phone: '0900101010',
      gender: 'Nữ',
      birthday: '10/10/2010',
      role: 'Người dùng',
      gold: 0,
      avatar: 'Bich',
      isLocked: true,
    }
  
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

  const handleLockChange = (id, newLockStatus) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, isLocked: newLockStatus } : user
    );
    setUsers(updatedUsers);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleEditButtonClick = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const filteredUsers = users.filter(user => {
    if (filterStatus !== 'All' && user.status !== filterStatus) {
      return false;
    }
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

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
                  <div className="d-flex">
                    <div className="btn-group me-3">
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
                        onClick={() => handleFilterChange('Đợi duyệt')}
                      >
                        Đợi duyệt
                      </button>
                    </div>
                    <div className="search-bar">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                    </div>
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
                                <img src={user.avatar} className="me-2 img-3x rounded-3" alt="avt" />
                                {user.name}
                              </td>
                              <td className="email">{user.email}</td>
                              <td className="password">{user.password}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <i className={`icon-circle1 me-2 fs-5 ${user.status === "Đợi duyệt" ? "text-danger" : (user.isLocked ? "text-light" : "text-success")}`}></i>
                                  {user.status === "Đợi duyệt" ? (
                                      <span className="text-danger">Đợi duyệt</span>
                                  ) : (
                                    user.status
                                  )}
                                </div>
                              </td>
                              <td>{user.phone}</td>
                              <td>{user.gender}</td>
                              <td>{user.gold}</td>
                              <td>
                                {filterStatus !== 'Pending' && (
                                  <>
                                    <EditButton onEdit={() => handleEditButtonClick(user)} />
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
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
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

      {/* Profile Modal */}
      {showModal && currentUser && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="main">
              <div className="row">
                <div className="col-sm-6 picture">
                  <center>
                    <img
                      className="circle responsive-img"
                      src={currentUser.avatar}
                      alt="profile"
                    />
                    <span>
                      <a className="btn-floating pulse waves-effect waves-light add">
                      </a>
                    </span>
                  </center>
                </div>
                <div className="col-sm-6 details">
                  <center>
                    <p className="name">
                      <b>{currentUser.name}</b>
                    </p>
                  </center>
                  <center>
                    <p className="email">{currentUser.email}</p>
                  </center>
                  <center>
                    <p className="phone">{currentUser.phone}</p>
                  </center>
                </div>
              </div>

              <table className="table">
                <tbody>
                  <tr>
                    <td class="custom-cell">
                      <p>
                        <b>Gender:</b>
                      </p>
                      <p>{currentUser.gender}</p>
                    </td>
                    <td class="custom-cell">
                      <p>
                        <b>Status:</b>
                      </p>
                      <p>{currentUser.status}</p>
                    </td>
                    <td class="custom-cell">
                      <p>
                        <b>Birthday:</b>
                      </p>
                      <p>{currentUser.birthday}</p>
                    </td>
                    <td class="custom-cell">
                      <p>
                        <b>Role:</b>
                      </p>
                      <p>{currentUser.role}</p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="buttons-container">
                <button className="waves-effect waves-light btn edit back-btn" onClick={handleCloseModal}>
                  Back
                </button>
                <button className="waves-effect waves-light btn edit change-role-btn">
                  Change Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
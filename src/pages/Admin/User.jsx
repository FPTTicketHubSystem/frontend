import React from 'react'
import '../../assets/font/icomoon/style.css'
import '../../assets/css/main.min.css'
import '../../assets/vendor/overlay-scroll/OverlayScrollbars.min.css'
import '../../assets/images/favicon.svg'
import Header from '../../component/Admin/Header'
import Navbar from '../../component/Admin/Navbar'
import UserList from '../../component/Admin/UserList'

const User = () => {

  return (
    <div class="page-wrapper">

    <div class="app-container">

        <div class="app-header d-flex align-items-center">

        <Header/>

        </div>

        <Navbar/>

        <div class="app-body">

            <div class="container">


                <div class="row">
                    <div class="col-12 col-xl-6">


                        <ol class="breadcrumb mb-3">
                            <li class="breadcrumb-item">
                                <i class="icon-home lh-1"></i>
                                <a href="/" class="text-decoration-none">Home</a>
                            </li>
                            <li class="breadcrumb-item text-light">User</li>
                        </ol>

                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="card mb-2">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped align-middle m-0">
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
                                            <UserList/>
                                            <UserList/>
                                            <UserList/>
                                            <UserList/>
                                            <UserList/>
                                            <UserList/>
                                            <UserList/>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>

    </div>


</div>
  )
}

export default User
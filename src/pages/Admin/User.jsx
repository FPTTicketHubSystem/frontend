import React from 'react'
// import '../../assets/fonts/icomoon/style.css'
// import '../../assets/css/main.min.css'
// import '../../assets/vendor/overlay-scroll/OverlayScrollbars.min.css'
// import '../../assets/images/favicon.svg'
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

              


            </div>

        </div>

    </div>


</div>
  )
}

export default User
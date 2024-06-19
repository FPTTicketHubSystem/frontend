import React from 'react'
import logo from '../../assets/images/logo/3.png'
import logo2 from '../../assets/images/logo/logo2.png'
const Header = () => {
  return (
    
    <div class="container">


    <div class="row">
        <div class="col-md-3 col-2">


            <div class="app-brand">
                <a href="/" class="d-lg-block d-none">
                    <img src={logo} class="logo" alt="FPTTicketHub" />
                </a>
                <a href="/" class="d-lg-none d-md-block">
                    <img src={logo2} class="logo" alt="FPTTicketHub" />
                </a>
            </div>

        </div>

        <div class="col-md-9 col-10">

            <div class="header-actions d-flex align-items-center justify-content-end">

                <div class="search-container d-none d-lg-block">
                    <input type="text" class="form-control" placeholder="Search" />
                    <i class="icon-search"></i>
                </div>

                <div class="dropdown ms-2">
                    <a class="dropdown-toggle d-flex align-items-center user-settings" href="#!" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="d-none d-md-block">Violeta Escobar</span>
                        <img src="assets/images/user.png" class="img-3x m-2 me-0 rounded-5" alt="Bootstrap Gallery" />
                    </a>
                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-sm shadow-sm gap-3" style={{}}>
                        <a class="dropdown-item d-flex align-items-center py-2" href="agent-profile.html"><i
                                class="icon-smile fs-4 me-3"></i>User Profile</a>
                        <a class="dropdown-item d-flex align-items-center py-2" href="account-settings.html"><i
                                class="icon-settings fs-4 me-3"></i>Account
                            Settings</a>
                        <a class="dropdown-item d-flex align-items-center py-2" href="login.html"><i
                                class="icon-log-out fs-4 me-3"></i>Logout</a>
                    </div>
                </div>


                <button class="btn btn-success btn-sm ms-3 d-lg-none d-md-block" type="button"
                    data-bs-toggle="offcanvas" data-bs-target="#MobileMenu">
                    <i class="icon-menu"></i>
                </button>


            </div>


        </div>
    </div>


</div>
  )
}

export default Header
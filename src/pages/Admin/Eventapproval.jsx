import React from 'react'
import '../../assets/font/icomoon/style.css'
import '../../assets/css/main.min.css'
import '../../assets/vendor/overlay-scroll/OverlayScrollbars.min.css'
import '../../assets/images/favicon.svg'
import Header from '../../component/Admin/Header'
import Navbar from '../../component/Admin/Navbar'
import Eventopen from '../../component/Admin/Eventopen'

const Eventapproval = () => {

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
                            <li class="breadcrumb-item text-light">Event Approval</li>
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
                                                <th>Event Name</th>
                                                <th>Organizer</th>
                                                <th>Category</th>
                                                <th>Decription</th>
                                                <th>Location</th>
                                                <th>Ticket Quantity</th>
                                                <th>Status</th>
                                                <th>TIme</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <Eventopen/>
                                            <Eventopen/>
                                            <Eventopen/>
                                            <Eventopen/>
                                            <Eventopen/>
                                            <Eventopen/>
                                            <Eventopen/>
                                            <Eventopen/>
                                            <Eventopen/>
                                            <Eventopen/>
                                            <Eventopen/>

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

export default Eventapproval
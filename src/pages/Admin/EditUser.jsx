import React from 'react';
import '../../assets/font/icomoon/style.css';
import '../../assets/css/main.min.css';
import '../../assets/vendor/overlay-scroll/OverlayScrollbars.min.css';
import '../../assets/images/favicon.svg';
import '../../assets/vendor/dropzone/dropzone.min.css';
import Header from '../../components/Admin/Header';
import Navbar from '../../components/Admin/Navbar';
import Duc from '../../assets/images/Duc.jpg'


const EditUser = () => {

	function displaySelectedImage(event, elementId) {
		const selectedImage = document.getElementById(elementId);
		const fileInput = event.target;
	
		if (fileInput.files && fileInput.files[0]) {
			const reader = new FileReader();
	
			reader.onload = function(e) {
				selectedImage.src = e.target.result;
			};
	
			reader.readAsDataURL(fileInput.files[0]);
		}
	}
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
                                <ol className="breadcrumb mb-3">
                                    <li className="breadcrumb-item">
                                        <i className="icon-home lh-1"></i>
                                        <a href="/" className="text-decoration-none">Home</a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="/user" className="text-decoration-none">User</a>
                                    </li>
                                    <li className="breadcrumb-item text-light">Edit User</li>
                                </ol>
                            </div>
                        </div>

                        <div className="row gx-2">
                            <div className="col-xxl-12">
                                <div className="card mb-2">
                                    <div className="card-body">
                                        <div className="custom-tabs-container">
                                            <div className="tab-content h-350">
                                                <div className="tab-pane fade show active" id="oneA" role="tabpanel">
                                                    <div className="row gx-2">
                                                        <div className="col-sm-4 col-12">
                                                            <div id="update-profile" className="mb-3">
                                                                <div>
                                                                    <div className="mb-4 d-flex justify-content-center">
                                                                        <img id="selectedImage" src={Duc} alt="example placeholder" style={{width: "300px"}} />
                                                                    </div>
                                                                    <div className="d-flex justify-content-center">
                                                                        <div data-mdb-ripple-init className="btn btn-primary btn-rounded">
                                                                            <label className="form-label text-white m-1" htmlFor="customFile1">Choose file</label>
                                                                            <input type="file" className="form-control d-none" id="customFile1" onChange={(event) => displaySelectedImage(event, 'selectedImage')} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-8 col-12">
                                                            <div className="row gx-2">
                                                                <div className="col-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="fullName" className="form-label">Full Name</label>
                                                                        <input type="text" className="form-control" id="fullName" placeholder="Full Name" />
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <label htmlFor="contactNumber" className="form-label">Phone</label>
                                                                        <input type="text" className="form-control" id="contactNumber" placeholder="Contact" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="emailId" className="form-label">Email</label>
                                                                        <input type="email" className="form-control" id="emailId" placeholder="Email ID" />
                                                                    </div>

																	<div className="mb-3">
                                                                        <label htmlFor="" className="form-label">Gender</label>
                                                                        <input type="Gender" className="form-control" id="Gender" placeholder="Giới Tính" />
                                                                    </div>


                                                                </div>
																<div className="col-6">
                                                                    <div className="mb-3">
                                                                        <label htmlFor="GoldId" className="form-label">Gold</label>
                                                                        <input type="Gold" className="form-control" id="GoldId" placeholder="Gold" />
                                                                    </div>

															


                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2 justify-content-end">
                                                <button type="button" className="btn btn-light">Cancel</button>
                                                <button type="button" className="btn btn-success">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;

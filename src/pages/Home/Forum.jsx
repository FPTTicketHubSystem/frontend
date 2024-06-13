import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function Forum() {
    return (
        <>
            <section className="about spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="about__pic">
                                <img src="img/about/about.png" alt=""/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about__text">
                                <div className="section-title">
                                    <h2>Cộng đồng người dùng FPTTickethub</h2>
                                    <h1>About me</h1>
                                </div>
                                <p>description lq gì đó</p>
                                <a href="#" className="primary-btn">THAM GIA NGAY</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Forum;

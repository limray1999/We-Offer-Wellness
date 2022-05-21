import Navigation from "./Navigation";
import React from "react";
import {FaHospitalAlt, FaHospitalUser, FaSearch} from "react-icons/fa";
import {BsTelephone} from "react-icons/bs";
import {RiStethoscopeLine} from "react-icons/ri";
import {Link} from "react-router-dom";


class Home extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Navigation user={this.props.user} setUser={this.props.setUser}/>
                <div style={{marginTop: "100px"}}>
                    <div className="container">
                        <div className="row g-2">
                            <div className="col-md-4">
                                <div className="card" style={{height: "250px"}}>
                                    <div className="card-body">
                                        <h3 className="card-title"><FaSearch/> About us</h3><br/>
                                        <p className="card-text">
                                            {"We Offer Wellness (WOW) is one of the largest healthcare group in United States, " +
                                            "we have more than 100 affiliated hospital and the best medical group over this country. " +
                                            "Here, you can you can get the best medical service at the lowest price" +
                                            " "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card" style={{height: "250px"}}>
                                    <div className="card-body">
                                        <h3 className="card-title"><FaHospitalAlt/> Hospital</h3><br/>
                                        <p className="card-text">
                                            <Link to="/hospital">Click here to see the hospital list</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card" style={{height: "420px"}}>
                                    <div className="card-body">
                                        <h3 className="card-title"><FaHospitalUser/> Doctors</h3><br/>
                                        <p className="card-text">
                                            <Link to="/doctor">Click here to see the doctor list</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="container">
                                    <div className="row">
                                        <div className="card" style={{height: "220px"}}>
                                            <div className="card-body">
                                                <h3 className="card-title"><RiStethoscopeLine/> Services</h3><br/>
                                                <p className="card-text">
                                                    {"Emergency room services"}<br/>
                                                    {"Short-term hospitalization"}<br/>
                                                    {"General and specialty surgical services"}<br/>
                                                    {"Laboratory services"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="card" style={{height: "200px"}}>
                                            <div className="card-body">
                                                <h3 className="card-title"><BsTelephone/> Contact us</h3><br/>
                                                <p className="card-text">
                                                    {"support hotline: 234-583-1249"}<br/>
                                                    {"compliant number: 347-248-1934"}<br/>
                                                    {"email: wow@gmail.com"}
                                                </p>
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
    }
}

export default Home;

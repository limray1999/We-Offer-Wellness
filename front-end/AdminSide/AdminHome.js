import React, {Component} from 'react';
import {Navigate} from "react-router-dom";
import Navigation from "./Navigation";
import {FaHospitalAlt, FaHospitalUser, FaBed} from "react-icons/fa";
import {MdSick} from "react-icons/md";
import HospitalService from "../Services/HospitalService";
import EmployeeService from "../Services/EmployeeService";
import PatientService from "../Services/PatientService";

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            admin: this.props.admin,
            numberOfHospital: null,
            numberOfDoctor: null,
            numberOfPatient: null,
        }
    }

    componentDidMount() {
        HospitalService.numberOfHospital()
            .then(resp => this.setState({numberOfHospital: resp.data}))
            .catch(e=>console.log(e.response));
        EmployeeService.numberOfDoctor()
            .then(resp => this.setState({numberOfDoctor: resp.data}))
            .catch(e=>console.log(e.response));
        PatientService.numberOfPatient()
            .then(resp => this.setState({numberOfPatient: resp.data}))
            .catch(e=>console.log(e.response));
    }

    render() {
        return (
            <div>
                {
                    !this.state.admin &&
                    <Navigate to="/admin/signin"/>
                }
                {
                    this.state.admin &&
                    <div>
                        <Navigation setAdmin={(b)=>this.props.setAdmin(b)}/>
                        <div style={{marginTop: "200px"}}>
                            <h1 className="text-center" style={{marginBottom: "50px"}}>Welcome to WOW management system!</h1>
                            <div className="container">
                                <div className="row gx-5" style={{height: "250px"}}>
                                    <div className="col-md-4">
                                        <div className="border border-dark rounded position-relative" style={{height: "250px"}}>
                                            <div style={{position: "absolute", marginLeft: "5px", marginTop: "10px"}}>
                                                <FaHospitalAlt size={220}></FaHospitalAlt>
                                            </div>
                                            <h5 style={{position: "absolute", marginLeft: "65%", marginTop: "40px"}}>
                                                # of hospital:
                                            </h5>
                                            <h2 style={{position: "absolute", marginLeft: "75%", marginTop: "120px"}}>
                                                {this.state.numberOfHospital}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="border border-dark rounded position-relative" style={{height: "250px"}}>
                                            <div style={{position: "absolute", marginLeft: "5px", marginTop: "10px"}}>
                                                <FaHospitalUser size={220}></FaHospitalUser>
                                            </div>
                                            <h5 style={{position: "absolute", marginLeft: "65%", marginTop: "40px"}}>
                                                # of doctor:
                                            </h5>
                                            <h2 style={{position: "absolute", marginLeft: "75%", marginTop: "120px"}}>
                                                {this.state.numberOfDoctor}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="border border-dark rounded position-relative" style={{height: "250px"}}>
                                            <div style={{position: "absolute", marginLeft: "5px", marginTop: "10px"}}>
                                                <FaBed size={220}></FaBed>
                                            </div>
                                            <h5 style={{position: "absolute", marginLeft: "65%", marginTop: "40px"}}>
                                                # of patient:
                                            </h5>
                                            <h2 style={{position: "absolute", marginLeft: "75%", marginTop: "120px"}}>
                                                {this.state.numberOfPatient}
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default AdminHome;

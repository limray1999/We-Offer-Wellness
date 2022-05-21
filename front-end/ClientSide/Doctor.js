import React, {Component} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import EmployeeService from "../Services/EmployeeService";
import HospitalService from "../Services/HospitalService";
import PatientService from "../Services/PatientService";

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: this.props.history,
            doctors: [],
            doctorId: null,
            searchBy: null,
            searchCondition: null,
        }
    }


    componentDidMount() {
        EmployeeService.getDoctorList()
            .then(resp => this.setState({doctors: resp.data}))
            .catch(e => console.log(e.response));
    }

    render() {
        return (
            <div>
                    <Navigation user={this.props.user} setUser={this.props.setUser}/>
                    <div style={{marginTop: "100px"}}>
                        <h2 className="text-center">Doctor List</h2>
                        <div className="float-start">
                            <div className="input-group">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                    {this.state.searchBy?this.state.searchBy:"Filter"}
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#" onClick={()=>{
                                        EmployeeService.getDoctorList()
                                            .then(resp => {
                                                this.setState({
                                                    doctors: resp.data,
                                                    searchBy: null,
                                                    searchCondition: null,
                                                })
                                            })
                                    }}>reset</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "firstName"})}}>first name</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "lastName"})}}>last name</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "hospitalId"})}}>hospital id</a></li>
                                </ul>
                                <input type="text" className="form-control"
                                       value={this.state.searchCondition?this.state.searchCondition:""}
                                       onChange = {(event) => {this.setState({searchCondition: event.target.value})}}
                                />
                                <button className="btn btn-outline-secondary"
                                        onClick={()=>{
                                            if(this.state.searchBy==="firstName") {
                                                EmployeeService.getDoctorByFirstName(this.state.searchCondition)
                                                    .then(resp => {this.setState({doctors: resp.data})})
                                                    .catch(e=>console.log(e.response));
                                            } else if(this.state.searchBy==="hospitalId") {
                                                EmployeeService.getDoctorByHospitalId(this.state.searchCondition)
                                                    .then(resp => {this.setState({doctors: resp.data})})
                                                    .catch(e=>console.log(e.response));
                                            } else if(this.state.searchBy==="lastName") {
                                                EmployeeService.getDoctorByLastName(this.state.searchCondition)
                                                    .then(resp => {this.setState({doctors: resp.data})})
                                                    .catch(e=>console.log(e.response));
                                            }
                                        }}
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Last Name</th>
                                    <th>Birth Date</th>
                                    <th>Hospital Id</th>
                                    <th>Type</th>
                                    <th>Office Number</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.doctors.map((doctor) =>
                                        <tr key={doctor.id}>
                                            <td>{doctor.firstName}</td>
                                            <td>{doctor.middleName}</td>
                                            <td>{doctor.lastName}</td>
                                            <td>{doctor.birthDate}</td>
                                            <td>{doctor.hospital.id}</td>
                                            <td>{doctor.salary?"Full Time":"Consulting"}</td>
                                            <td>{doctor.officeNumber}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        );
    }
}

export default (props) => {
    return <Doctor {...props} history={useNavigate()} />
};

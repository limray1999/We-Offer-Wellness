import React, {Component} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import EmployeeService from "../Services/EmployeeService";
import HospitalService from "../Services/HospitalService";
import PatientService from "../Services/PatientService";

class AdminDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            deleteWindow: false,
            doctors: [],
            doctorId: null,
            searchBy: null,
            searchCondition: null,
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        EmployeeService.deleteEmployeeById(this.state.doctorId)
            .then(resp => this.setState({
                doctors: this.state.doctors.filter(doctor => doctor.id!==this.state.doctorId),
                deleteWindow: false,
                doctorId: null,
            }))
            .catch(e => console.log(e));
    }

    componentDidMount() {
        EmployeeService.getDoctorList()
            .then(resp => this.setState({doctors: resp.data}))
            .catch(e => console.log(e.response));
    }

    render() {
        return (
            <div>
                {
                    !this.state.admin &&
                    <Navigate to="/admin/signin" />
                }
                {
                    this.state.admin &&
                    <div>
                        <Navigation setAdmin={this.props.setAdmin}/>
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
                            <div className="float-end">
                                <button className="btn btn-primary" onClick={()=>this.state.history("/admin/editdoctor", {state: {doctorId: -1}})}>Add</button>
                            </div>
                            <div>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Middle Name</th>
                                        <th>Last Name</th>
                                        <th>Birth Date</th>
                                        <th>SSN</th>
                                        <th>Hospital Id</th>
                                        <th>Type</th>
                                        <th>Details</th>
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
                                                <td>{doctor.ssn}</td>
                                                <td>{doctor.hospital.id}</td>
                                                <td>{doctor.salary?"Full Time":"Consulting"}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={()=>this.props.history("/admin/editdoctor", {state: {doctorId: doctor.id}})}>Edit</button>
                                                    <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={()=>this.setState({deleteWindow: true, doctorId: doctor.id})}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
                {
                    this.state.deleteWindow &&
                    <div>
                        <div className="card border-dark col-md-6 offset-md-2" style={{top: "200px", position: "absolute"}}>
                            <h3 className="text-center">Are you sure to delete this Disease?</h3>
                            <br/><br/>
                            <div className="card-body">
                                <div className="text-center">
                                    <button className="btn btn-danger" onClick={()=>{this.handleDelete()}}>Delete</button>
                                    <button style={{marginLeft: "50px"}} className="btn btn-secondary" onClick={()=>{this.setState({deleteWindow: false, diseaseICD: null})}}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default (props) => {
    return <AdminDoctor {...props} history={useNavigate()} />
};

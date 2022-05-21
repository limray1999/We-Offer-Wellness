import React, {Component} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import PatientService from "../Services/PatientService";
import HospitalService from "../Services/HospitalService";

class AdminPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            patientList: [],
            patientId: null,
            deleteWindow: false,
            searchBy: null,
            searchCondition: null,
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        PatientService.deletePatientById(this.state.patientId)
            .then(resp=>this.setState({
                patientList: this.state.patientList.filter(patient=>patient.id!=this.state.patientId),
                patientId: null,
                deleteWindow: false,
            }))
            .catch(e=>console.log(e.response));
    }

    componentDidMount() {
        PatientService.getPatientList()
            .then(resp=>this.setState({patientList: resp.data}))
            .catch(e=>console.log(e.response));
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
                        <Navigation setAdmin={this.props.setAdmin} />
                        <div style={{marginTop: "100px"}}>
                            <h2 className="text-center">Patient List</h2>
                            <div className="float-start">
                                <div className="input-group">
                                    <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        {this.state.searchBy?this.state.searchBy:"Filter"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#" onClick={()=>{
                                            PatientService.getPatientList()
                                                .then(resp => {
                                                    this.setState({
                                                        patientList: resp.data,
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
                                                    PatientService.getPatientByFirstName(this.state.searchCondition)
                                                        .then(resp => {this.setState({patientList: resp.data})})
                                                        .catch(e=>console.log(e.response));
                                                } else if(this.state.searchBy==="hospitalId") {
                                                    PatientService.getPatientByHospitalId(this.state.searchCondition)
                                                        .then(resp => {this.setState({patientList: resp.data})})
                                                        .catch(e=>console.log(e.response));
                                                } else if(this.state.searchBy==="lastName") {
                                                    PatientService.getPatientByLastName(this.state.searchCondition)
                                                        .then(resp => {this.setState({patientList: resp.data})})
                                                        .catch(e=>console.log(e.response));
                                                }
                                            }}
                                    >
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="float-end">
                                <button className="btn btn-primary" onClick={()=>this.state.history("/admin/editpatient", {state: {id: -1}})}>Add</button>
                            </div>
                            <div>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Patient Id</th>
                                        <th>Type</th>
                                        <th>First Name</th>
                                        <th>Middle Name</th>
                                        <th>Last Name</th>
                                        <th>Phone Number</th>
                                        <th>Birth Date</th>
                                        <th>Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.patientList.map((patient) =>
                                            <tr key={patient.id}>
                                                <td>{patient.id}</td>
                                                <td>{("floor" in patient)?"in":"out"}</td>
                                                <td>{patient.firstName}</td>
                                                <td>{patient.middleName}</td>
                                                <td>{patient.lastName}</td>
                                                <td>{patient.phoneNumber}</td>
                                                <td>{patient.birthDate}</td>
                                                <td>
                                                    <button className="btn btn-info" onClick={()=>this.props.history("/admin/patient/"+patient.id)}>View</button>
                                                    <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={()=>this.setState({deleteWindow: true, patientId: patient.id})}>Delete</button>
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
                            <h3 className="text-center">Are you sure to delete this Patient?</h3>
                            <br/><br/>
                            <div className="card-body">
                                <div className="text-center">
                                    <button className="btn btn-danger" onClick={()=>{this.handleDelete()}}>Delete</button>
                                    <button style={{marginLeft: "50px"}} className="btn btn-secondary" onClick={()=>{this.setState({deleteWindow: false, patientId: null})}}>Back</button>
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
    return <AdminPatient {...props} history={useNavigate()} />
};

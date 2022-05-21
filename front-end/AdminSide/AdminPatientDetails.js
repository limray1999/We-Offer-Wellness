import React, {Component} from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import Navigation from "./Navigation";
import PatientService from "../Services/PatientService";

class AdminPatientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            patient: {},
            id: this.props.id.id,
        }
    }

    componentDidMount() {
        PatientService.getById(this.state.id)
            .then(resp=>this.setState({patient: resp.data}))
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
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                            <h3 className="text-center">Patient Details</h3>
                            <div className="card-body">
                                <div style={{marginLeft: "100px"}}>
                                    <div>First Name: {this.state.patient.firstName}</div><br/>
                                    <div>Middle Name: {this.state.patient.middleName}</div><br/>
                                    <div>Last Name: {this.state.patient.lastName}</div><br/>
                                    <div>Birth Date: {this.state.patient.birthDate}</div><br/>
                                    <div>Blood Group: {this.state.patient.bloodGroup}</div><br/>
                                    <div>Gender: {this.state.patient.gender}</div><br/>
                                    <div>Marital Status: {this.state.patient.maritalStatus}</div><br/>
                                    <div>Race: {this.state.patient.race}</div><br/>
                                    <div>Phone Number: {this.state.patient.phoneNumber}</div><br/>
                                    <div>Country: {this.state.patient.country}</div><br/>
                                    <div>State: {this.state.patient.state}</div><br/>
                                    <div>City: {this.state.patient.city}</div><br/>
                                    <div>Street: {this.state.patient.street}</div><br/>
                                    <div>Insurance Number: {this.state.patient.insuranceNumber}</div><br/>
                                    <div>Insurance Company: {this.state.patient.insuranceCompany?this.state.patient.insuranceCompany.name:null}</div><br/>
                                    <div>
                                        Hospital: {this.state.patient.hospital?this.state.patient.hospital.name:null}
                                        <button style={{marginLeft: "20px"}} className="btn btn-info" onClick={()=>{this.state.history("/admin/hospital/"+this.state.patient.hospital.id)}}>View</button>
                                    </div><br/>
                                    <div>
                                        Registration: <button style={{marginLeft: "20px"}} className="btn btn-info" onClick={()=>{this.state.history("/admin/registration", {state: {patientId: this.state.id}})}}>View </button>
                                    </div><br/>
                                    {
                                        !("floor" in this.state.patient) &&
                                        <div>
                                            <div>Type: Out Patient</div><br/>
                                            <div>Follow Up Date: {this.state.patient.followupDate}</div><br/>
                                        </div>
                                    }
                                    {
                                        ("floor" in this.state.patient) &&
                                        <div>
                                            <div>Type: In Patient</div><br/>
                                            <div>Admission Date: {this.state.patient.admissionDate}</div><br/>
                                            <div>Bed Number: {this.state.patient.bedNumber}</div><br/>
                                            <div>Floor: {this.state.patient.floor}</div><br/>
                                            <div>Discharge Date: {this.state.patient.dischargeDate}</div><br/>
                                        </div>
                                    }
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={()=>{this.state.history("/admin/editpatient", {state: {id: this.state.id}})}}>Edit</button>
                                    <button style={{marginLeft: "100px"}} className="btn btn-secondary" onClick={()=>{this.state.history(-1)}}>Back</button>
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
    return <AdminPatientDetails {...props} history={useNavigate()} id={useParams()}/>
};

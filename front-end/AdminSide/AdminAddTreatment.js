import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import RegistrationService from "../Services/RegistrationService";
import PatientService from "../Services/PatientService";
import EmployeeService from "../Services/EmployeeService";
import TreatmentService from "../Services/TreatmentService";

class AdminAddTreatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            registrationId: this.props.location.state.registrationId,
            patientId: this.props.location.state.patientId,
            type: "drug",
            doctors: [],
            treatment: {
                registration: null,
                patient: null,
                doctor: {},
                cost: 0,
                startDate: new Date().toISOString().slice(0,10),
                status: "Follow-up",

                drugName: "Drug Name",
                dose: 0,

                laboratoryName: "Lab Name",
                testType: "Test Type",
                testDate: new Date().toISOString().slice(0,10),
                labResult: null,

                surgeryName: "Surgery Name",
                description: null,
                surgeryDate: new Date().toISOString().slice(0,10),
                surgeryResult: null,
            },
        }

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        EmployeeService.getDoctorByPatientId(this.state.patientId)
            .then(resp => this.setState({doctors: resp.data}))
            .catch(e => console.log(e.response));
        RegistrationService.getById(this.state.registrationId)
            .then(resp => this.setState(prevState => ({treatment: {...prevState.treatment, registration: resp.data}})))
            .catch(e => console.log(e.response));
        PatientService.getById(this.state.patientId)
            .then(resp => this.setState(prevState => ({treatment: {...prevState.treatment, patient: resp.data}})))
            .catch(e => console.log(e.response));
    }

    handleSave() {
        if(this.state.type === "drug") {
            TreatmentService.saveDrug(this.state.treatment)
                .then(resp => this.state.history("/admin/treatment", {state:{registrationId: this.state.registrationId, patientId: this.state.patientId}}))
                .catch(e => alert(e.response.data.message));
        } else if(this.state.type === "lab") {
            TreatmentService.saveLab(this.state.treatment)
                .then(resp => this.state.history("/admin/treatment", {state:{registrationId: this.state.registrationId, patientId: this.state.patientId}}))
                .catch(e => alert(e.response.data.message));
        } else {
            TreatmentService.saveSurgery(this.state.treatment)
                .then(resp => this.state.history("/admin/treatment", {state:{registrationId: this.state.registrationId, patientId: this.state.patientId}}))
                .catch(e => alert(e.response.data.message));
        }
    }

    render() {
        console.log(this.state.treatment);
        console.log(this.state.doctors);
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
                            <h3 className="text-center">Add Treatment</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>Type: </label>
                                    <select
                                        className="form-select" value={this.state.type}
                                        onChange={(event)=>this.setState({type: event.target.value})}
                                    >
                                        <option key="drug" value="drug" >Drug</option>
                                        <option key="lab" value="lab" >Laboratory</option>
                                        <option key="surgery" value="surgery">Surgery</option>
                                    </select><br/>
                                    <label>Doctor: </label>
                                    <select
                                        required className="form-select"
                                        value={Object.keys(this.state.treatment.doctor).length===0?-1:this.state.treatment.doctor.id}
                                        onChange={event => {
                                            EmployeeService.getDoctorById(event.target.value)
                                                .then(resp => {this.setState(prevState => ({treatment: {...prevState.treatment, doctor: resp.data}}))})
                                                .catch(e => console.log(e.response));
                                        }}
                                    >
                                        {<option key={-1} value={-1} disabled>---Make a selection---</option>}
                                        {this.state.doctors.map(doctor =>
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.firstName + " " + doctor.lastName}
                                        </option>)}
                                    </select><br/>
                                    <label>Cost: </label>
                                    <input
                                        required className="form-control" type="number" step="0.01"
                                        value={this.state.treatment.cost}
                                        onChange={event=>{
                                            this.setState(prevState => ({
                                                treatment: {...prevState.treatment, cost: event.target.value}
                                            }))
                                        }}
                                    /><br/>
                                    {
                                        this.state.type==="drug" &&
                                        <div>
                                            <label>Drug Name: </label>
                                            <input
                                                className="form-control" required type="text"
                                                value={this.state.treatment.drugName}
                                                onChange={event => {
                                                    this.setState(prevState => ({
                                                        treatment: {...prevState.treatment, drugName: event.target.value}
                                                    }))
                                                }}
                                            /><br/>
                                            <label>Dose: </label>
                                            <input
                                                className="form-control" required type="number"
                                                value={this.state.treatment.dose}
                                                onChange={event => {
                                                    this.setState(prevState => ({
                                                        treatment: {...prevState.treatment, dose: event.target.value}
                                                    }))
                                                }}
                                            /><br/>
                                        </div>
                                    }
                                    {
                                        this.state.type==="lab" &&
                                        <div>
                                            <label>Laboratory Name: </label>
                                            <input
                                                className="form-control" required type="text"
                                                value={this.state.treatment.laboratoryName}
                                                onChange={event => {
                                                    this.setState(prevState => ({
                                                        treatment: {...prevState.treatment, laboratoryName: event.target.value}
                                                    }))
                                                }}
                                            /><br/>
                                            <label>Test Type: </label>
                                            <input
                                                className="form-control" required type="text"
                                                value={this.state.treatment.testType}
                                                onChange={event => {
                                                    this.setState(prevState => ({
                                                        treatment: {...prevState.treatment, testType: event.target.value}
                                                    }))
                                                }}
                                            /><br/>
                                            <label>Test Date: </label>
                                            <input
                                                className="form-control" required type="date"
                                                value={this.state.treatment.testDate}
                                                onChange={event => {
                                                    this.setState(prevState => ({
                                                        treatment: {...prevState.treatment, testDate: event.target.value}
                                                    }))
                                                }}
                                            /><br/>
                                        </div>
                                    }
                                    {
                                        this.state.type==="surgery" &&
                                        <div>
                                            <label>Surgery Name: </label>
                                            <input required type="text" className="form-control"
                                                   value={this.state.treatment.surgeryName}
                                                   onChange={event=>{
                                                       this.setState(prevState => ({
                                                           treatment: {...prevState.treatment, surgeryName: event.target.value}
                                                       }))
                                                   }}

                                            /><br/>
                                            <label>Description: </label>
                                            <input type="text" className="form-control"
                                                   value={this.state.treatment.description?this.state.treatment.description:""}
                                                   onChange={event=>{
                                                       this.setState(prevState => ({
                                                           treatment: {...prevState.treatment, description: event.target.value}
                                                       }))
                                                   }}
                                            /><br/>
                                            <label>Surgery Date: </label>
                                            <input required type="date" className="form-control"
                                                   value={this.state.treatment.surgeryDate}
                                                   onChange={event=>{
                                                       this.setState(prevState => ({
                                                           treatment: {...prevState.treatment, surgeryDate: event.target.value}
                                                       }))
                                                   }}
                                            /><br/>
                                        </div>
                                    }
                                </form>
                                <div className="text-center">
                                    <button className="btn btn-success" onClick={()=>{this.handleSave()}}>Save</button>
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
    return <AdminAddTreatment {...props} history={useNavigate()} location={useLocation()} />
};

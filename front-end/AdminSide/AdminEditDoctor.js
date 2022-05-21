import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import EmployeeService from "../Services/EmployeeService";
import HospitalService from "../Services/HospitalService";

class AdminEditDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            doctorId: this.props.location.state.doctorId,
            doctorType: "c",
            hospitalList: [],
            doctor: {
                firstName: "First Name",
                middleName: "Middle Name",
                lastName: "Last Name",
                birthDate: new Date().toISOString().slice(0, 10),
                ssn: "123456789",
                hospital: {},
                specialty: "Specialty",
                officeNumber: "123456790",
                personalNumber: "1234567890",

                contractDate: new Date().toISOString().slice(0, 10),
                contractNumber: "12345",
                minimumWeeklyHour: 30,

                hireDate: new Date().toISOString().slice(0, 10),
                salary: 5000,
            }
        };
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
        console.log(JSON.stringify(this.state.doctor));
        if(this.state.doctorId === -1) {
            if(this.state.doctorType === "c") {
                EmployeeService.saveCDoctor(this.state.doctor)
                    .then(resp => this.state.history("/admin/doctor"))
                    .catch(e => alert(e.response.data.message));
            } else {
                EmployeeService.saveFDoctor(this.state.doctor)
                    .then(resp => this.state.history("/admin/doctor"))
                    .catch(e => alert(e.response.data.message));
            }
        } else {
            if(this.state.doctorType === "c") {
                EmployeeService.updateCDoctor(this.state.doctor)
                    .then(resp => this.state.history("/admin/doctor"))
                    .catch(e => alert(e.response));
            } else {
                EmployeeService.updateFDoctor(this.state.doctor)
                    .then(resp => this.state.history("/admin/doctor"))
                    .catch(e => alert(e.response.data.message));
            }
        }
    }

    componentDidMount() {
        if(this.state.doctorId !== -1) {
            EmployeeService.getDoctorById(this.state.doctorId)
                .then(resp => this.setState({
                    doctor: resp.data,
                    doctorType: resp.data.salary?"f":"c",
                }))
                .catch(e => console.log(e.response.data.message));
        }
        HospitalService.getHospitals()
            .then(resp => this.setState({hospitalList: resp.data}))
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
                        <Navigation setAdmin={this.props.setAdmin} />
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                            <h3 className="text-center">{this.state.doctorId===-1?"Add":"Edit"} Doctor</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>FirstName: </label>
                                    <input required className="form-control" type="text" value={this.state.doctor.firstName}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({doctor: {...prevState.doctor, firstName: event.target.value}}))}}/><br/>
                                    <label>Middle Name: </label>
                                    <input required className="form-control" type="text" value={this.state.doctor.middleName}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({doctor: {...prevState.doctor, middleName: event.target.value}}))}}/><br/>
                                    <label>Last Name: </label>
                                    <input required className="form-control" type="text" value={this.state.doctor.lastName}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({doctor: {...prevState.doctor, lastName: event.target.value}}))}}/><br/>
                                    <label>Birth Date: </label>
                                    <input required className="form-control" type="date" value={this.state.doctor.birthDate}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({doctor: {...prevState.doctor, birthDate: event.target.value}}))}}/><br/>
                                    <label>SSN: </label>
                                    <input required className="form-control" type="text" value={this.state.doctor.ssn}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({doctor: {...prevState.doctor, ssn: event.target.value}}))}}/><br/>
                                    <label>Hospital: </label>
                                    <select
                                        required className="form-select" value={Object.keys(this.state.doctor.hospital).length===0?-1:this.state.doctor.hospital.id}
                                        onChange={(event) => {
                                            let hospital = {};
                                            HospitalService.getHospitalById(event.target.value)
                                                .then(resp => {
                                                    hospital = {...resp.data};
                                                    this.setState(prevState => ({doctor: {...prevState.doctor, hospital: hospital}}));
                                                })
                                                .catch(e => console.log(e.response));
                                        }}
                                    >
                                        {<option key={-1} value={-1} disabled>---Make a selection---</option>}
                                        {
                                            this.state.hospitalList.map(hospital =>
                                                <option key={hospital.id} value={hospital.id}>
                                                    {hospital.name}
                                                </option>)
                                        }
                                    </select><br/>
                                    <label>Specialty: </label>
                                    <input required className="form-control" type="text" value={this.state.doctor.specialty}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({doctor: {...prevState.doctor, specialty: event.target.value}}))}}/><br/>
                                    <label>Office Number: </label>
                                    <input required className="form-control" type="text" value={this.state.doctor.officeNumber}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({doctor: {...prevState.doctor, officeNumber: event.target.value}}))}}/><br/>
                                    <label>Personal Number: </label>
                                    <input required className="form-control" type="text" value={this.state.doctor.personalNumber}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({doctor: {...prevState.doctor, personalNumber: event.target.value}}))}}/><br/>
                                    <label>Type: </label>
                                    <select
                                        className="form-select" required
                                        onChange={(event) => {
                                            this.setState({doctorType: event.target.value});
                                        }}
                                    >
                                        <option key="c" value="c">Consulting Doctor</option>
                                        <option key="f" value="f">Full Time Doctor</option>
                                    </select><br/>
                                    {
                                        this.state.doctorType === "c" &&
                                        <div>
                                            <label>Contract Number: </label>
                                            <input required className="form-control" type="text" value={this.state.doctor.contractNumber}
                                                   onChange={(event)=>
                                                   {this.setState((prevState)=>({doctor: {...prevState.doctor, contractNumber: event.target.value}}))}}/><br/>
                                            <label>Contract Date: </label>
                                            <input required className="form-control" type="date" value={this.state.doctor.contractDate}
                                                   onChange={(event)=>
                                                   {this.setState((prevState)=>({doctor: {...prevState.doctor, contractDate: event.target.value}}))}}/><br/>
                                            <label>Minimum Weekly Hour: </label>
                                            <input required className="form-control" type="text" value={this.state.doctor.minimumWeeklyHour}
                                                   onChange={(event)=>
                                                   {this.setState((prevState)=>({doctor: {...prevState.doctor, minimumWeeklyHour: event.target.value}}))}}/><br/>
                                        </div>
                                    }
                                    {
                                        this.state.doctorType === "f" &&
                                        <div>
                                            <label>Hire Date: </label>
                                            <input required className="form-control" type="date" value={this.state.doctor.hireDate}
                                                   onChange={(event)=>
                                                   {this.setState((prevState)=>({doctor: {...prevState.doctor, hireDate: event.target.value}}))}}/><br/>
                                            <label>Salary: </label>
                                            <input required className="form-control" type="number" value={this.state.doctor.salary}
                                                   onChange={(event)=>
                                                   {this.setState((prevState)=>({doctor: {...prevState.doctor, salary: event.target.value}}))}}/><br/>
                                        </div>
                                    }
                                </form>
                                <div className="text-center">
                                    <button className="btn btn-success" onClick={()=>this.handleSave()}>Save</button>
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
    return <AdminEditDoctor {...props} history={useNavigate()} location={useLocation()} />
};

import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import HospitalService from "../Services/HospitalService";
import PatientService from "../Services/PatientService";
import InsuranceCompany from "../Services/InsuranceCompany";

class AdminEditPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteWindow: false,
            admin: this.props.admin,
            history: this.props.history,
            patientId: this.props.location.state.id,
            type: "in",
            hasInsurance: false,
            patient: {
                insuranceNumber: null,
                insuranceCompany: null,
                firstName: "FirstName",
                middleName: "MiddleName",
                lastName: "lastName",
                birthDate: new Date().toISOString().slice(0,10),
                gender: "Male",
                country: "Country",
                state: "State",
                city: "City",
                street: "Street",
                zipcode: "12345",
                hospital: {},
                bloodGroup: "A",
                race: "African American",
                maritalStatus: "Single",
                phoneNumber: "1234567890",
                admissionDate: new Date().toISOString().slice(0,10),
                floor: 0,
                bedNumber: 0,
                followupDate: new Date().toISOString().slice(0,10)
            },
            listGenders: [
                "Male",
                "Female",
                "Other"
            ].map(gender => <option key={gender} value={gender}>{gender}</option>),
            listRaces: [
                "African American",
                "American-Indian",
                "Asian",
                "Hispanic or Latino",
                "Indian",
                "White"
            ].map((race) => <option key={race}>{race}</option>),
            listMaritalStatus: [
                "Single",
                "Married",
                "Widowed",
                "Divorced"
            ].map((maritalStatus) => <option key={maritalStatus} onChange={()=>{}}>{maritalStatus}</option>),
            listHospital: [],
            listBlood: ["A","B","AB","O"].map(bloodGroup => <option key={bloodGroup} onChange={()=>{}}>{bloodGroup}</option> ),
            listInsuranceCompany: []
        }
    }

    handleSave() {
        console.log(this.state.patient)
        if(this.state.type === "in") {
            if(this.state.patientId!==-1) {
                //PatientService.deletePatientById(this.state.patientId).then(resp=>{});
                PatientService.updateIn(this.state.patient)
                    .then(resp=>this.state.history("/admin/patient"))
                    .catch(e=>alert(e.response.data.message));
            } else {
                PatientService.saveIn(this.state.patient)
                    .then(resp=>this.state.history("/admin/patient"))
                    .catch(e=>alert(e.response.data.message));
            }
        } else {
            if(this.state.patientId!==-1) {
                //PatientService.deletePatientById(this.state.patientId).then(resp=>{});
                PatientService.updateOut(this.state.patient)
                    .then(resp=>this.state.history("/admin/patient"))
                    .catch(e=>alert(e.response.data.message));
            } else {
                PatientService.saveOut(this.state.patient)
                    .then(resp=>this.state.history("/admin/patient"))
                    .catch(e=>alert(e.response.data.message));
            }
        }
    }

    componentDidMount() {
        HospitalService.getHospitals()
            .then(resp => this.setState({listHospital: resp.data}))
            .catch(e=>console.log(e.response));
        if(this.state.patientId!==-1) {
            PatientService.getById(this.state.patientId)
                .then(resp => {
                    //console.log("floor" in resp.data);
                    this.setState({
                        patient: resp.data,
                        type: ("floor" in resp.data) ? "in" : "out",
                        hasInsurance: resp.data.insuranceCompany?true:false,
                    })
                })
                .catch(e=>console.log(e.response));
        }
        InsuranceCompany.getInsuranceCompanyList()
            .then(resp => this.setState({listInsuranceCompany: resp.data}))
    }

    render() {
        // console.log(this.state.patient.hospital.id);
        // console.log(this.state.type);
        // console.log(this.state.patient);
        // console.log(JSON.stringify(this.state.patient));
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
                            <h3 className="text-center">{this.state.patientId===-1?"Add":"Edit"} Patient</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>First Name: </label>
                                    <input required className="form-control" type="text" value={this.state.patient.firstName}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, firstName: event.target.value}}))}}/><br/>
                                    <label>Middle Name: </label>
                                    <input className="form-control" type="text" value={this.state.patient.middleName?this.state.patient.middleName:""}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, middleName: event.target.value}}))}}/><br/>
                                    <label>Last Name: </label>
                                    <input required className="form-control" type="text" value={this.state.patient.lastName}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, lastName: event.target.value}}))}}/><br/>
                                    <label>Country: </label>
                                    <input required className="form-control" type="text" value={this.state.patient.country}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, country: event.target.value}}))}}/><br/>
                                    <label>State: </label>
                                    <input required className="form-control" type="text" value={this.state.patient.state}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, state: event.target.value}}))}}/><br/>
                                    <label>City: </label>
                                    <input required className="form-control" type="text" value={this.state.patient.city}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, city: event.target.value}}))}}/><br/>
                                    <label>Street: </label>
                                    <input required className="form-control" type="text" value={this.state.patient.street}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, street: event.target.value}}))}}/><br/>
                                    <label>Zipcode: </label>
                                    <input required className="form-control" type="text" value={this.state.patient.zipcode}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, zipcode: event.target.value}}))}}/><br/>
                                    <label>Phone Number: </label>
                                    <input required className="form-control" type="text" value={this.state.patient.phoneNumber}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, phoneNumber: event.target.value}}))}}/><br/>
                                    <label>Birth Date: </label>
                                    <input required className="form-control" type="date" value={this.state.patient.birthDate}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({patient: {...prevState.patient, birthDate: event.target.value}}))}}/><br/>
                                    <label>Gender: </label>
                                    <select required className="form-select"
                                           onChange={
                                               event =>
                                               {this.setState(
                                                   (prevState)=>({patient: {...prevState.patient, gender: event.target.value}})
                                               )}
                                           }>
                                        {this.state.listGenders}
                                    </select><br/>

                                    <label>Do you have insurance card? </label><br/>
                                    <div className="form-check form-check-inline">
                                        <input defaultChecked={this.state.patient.insuranceCompany} className="form-check-input" type="radio" name="hasInsurance" id="yesBox"
                                               onChange={()=>this.setState({hasInsurance: true})}
                                        />
                                        <label className="form-check-label" htmlFor="yesBox">
                                            Yes
                                        </label>

                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input defaultChecked={!this.state.patient.insuranceCompany} className="form-check-input" type="radio" name="hasInsurance" id="noBox"
                                               onChange={()=>this.setState(prevState=>({
                                                   hasInsurance: false,
                                                   patient: {...prevState.patient, insuranceNumber: null, insuranceCompany: null}
                                               }))}
                                        />
                                        <label className="form-check-label" htmlFor="noBox">
                                            No
                                        </label>
                                    </div><br/>
                                    {
                                        this.state.hasInsurance &&
                                        <div>
                                            <label>Insurance Number: </label>
                                            <input required className="form-control" type="text" value={this.state.patient.insuranceNumber?this.state.patient.insuranceNumber:""}
                                                   onChange={(event)=>
                                                   {this.setState((prevState)=>({patient: {...prevState.patient, insuranceNumber: event.target.value}}))}}/><br/>
                                            <label>Insurance Company: </label>
                                            <select required className="form-select"
                                                    value={this.state.patient.insuranceCompany?this.state.patient.insuranceCompany.id:-1}
                                                    onChange={(event)=> {
                                                        InsuranceCompany.getById(event.target.value)
                                                            .then(resp=>{
                                                                let insuranceCompany = {...resp.data};
                                                                this.setState(prevState=>({
                                                                    patient: {...prevState.patient, insuranceCompany: insuranceCompany}
                                                                }))
                                                            })
                                                            .catch(e=>alert(e.response.data.message));
                                                    }}>
                                                {
                                                    <option key={-1} value={-1} disabled>---Make a select---</option>
                                                }
                                                {
                                                    this.state.listInsuranceCompany.map(insuranceCompany =>
                                                        <option key={insuranceCompany.id} value={insuranceCompany.id}>{insuranceCompany.name}</option>)
                                                }
                                            </select><br/>
                                        </div>
                                    }
                                    <label>Race: </label>
                                    <select className="form-select"
                                            value={this.state.patientId===-1?"African American":this.state.patient.race}
                                            onChange={(event)=>{
                                                this.setState(prevState => ({
                                                    patient: {...prevState.patient, race: event.target.value}
                                                }))
                                            }}
                                    >
                                        {this.state.listRaces}
                                    </select>
                                    <label>Blood Group: </label>
                                    <select className="form-select"
                                            value={this.state.patientId===-1?"A":this.state.patient.bloodGroup}
                                            onChange={(event)=>{
                                                this.setState(prevState => ({
                                                    patient: {...prevState.patient, bloodGroup: event.target.value}
                                                }))
                                            }}
                                    >
                                        {this.state.listBlood}
                                    </select>
                                    <label>Marital Status: </label>
                                    <select className="form-select"
                                            value={this.state.patientId===-1?"Single":this.state.patient.maritalStatus}
                                            onChange={(event)=>{
                                                this.setState(prevState=>({
                                                    patient: {...prevState.patient, maritalStatus: event.target.value}
                                                }))
                                            }}
                                    >
                                        {this.state.listMaritalStatus}
                                    </select>
                                    <label>Hospital: </label>
                                    <select className="form-select"
                                            value={Object.keys(this.state.patient.hospital).length===0?-1:this.state.patient.hospital.id}
                                            onChange={
                                                event => {
                                                    HospitalService.getHospitalById(event.target.value)
                                                        .then(resp => {
                                                            let hospital = {...resp.data};
                                                            this.setState((prevState) => (
                                                                {patient: {...prevState.patient, hospital: hospital}}
                                                            ));
                                                        })
                                                        .catch(e => console.log(e.response));
                                                }
                                            }
                                    >
                                        {<option key={-1} value={-1} disabled>---Make a selection---</option>}
                                        {
                                            this.state.listHospital
                                                .map(
                                                    hospital => <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                                                )
                                        }
                                    </select>
                                    <label>Type: </label>
                                    <select
                                        className="form-select" value={this.state.type}
                                        onChange={event => {this.setState({type: event.target.value})}}
                                    >
                                        <option key={"in"} value={"in"}>
                                            in
                                        </option>
                                        <option key={"out"} value={"out"}>
                                            out
                                        </option>
                                    </select>
                                    {
                                        this.state.type === "in" &&
                                        <div>
                                            <label>Floor: </label>
                                            <input
                                                required className="form-control" type="number"
                                                value={this.state.patient.floor?this.state.patient.floor:0}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({patient: {...prevState.patient, floor: event.target.value}}))
                                                }}
                                            /><br/>
                                            <label>Bed Number: </label>
                                            <input
                                                required className="form-control" type="number"
                                                value={this.state.patient.bedNumber?this.state.patient.bedNumber:0}
                                                onChange={(event) =>{
                                                    this.setState(prevState => ({patient: {...prevState.patient, bedNumber: event.target.value}}))
                                                }}
                                            /><br/>
                                            <label>Admission Date: </label>
                                            <input
                                                required className="form-control" type="date"
                                                value={this.state.patient.admissionDate?this.state.patient.admissionDate:new Date().toISOString().slice(0,10)}
                                                onChange={(event) =>{
                                                    this.setState(prevState => ({patient: {...prevState.patient, admissionDate: event.target.value}}))
                                                }}
                                            /><br/>
                                        </div>
                                    }
                                    {
                                        this.state.type === "out" &&
                                        <div>
                                            <label>Follow Up Date: </label>
                                            <input
                                                required className="form-control" type="date"
                                                value={this.state.patient.followupDate?this.state.patient.followupDate:new Date().toISOString().slice(0,10)}
                                                onChange={(event) =>{
                                                    this.setState(prevState => ({patient: {...prevState.patient, followupDate: event.target.value}}))
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
    return <AdminEditPatient {...props} history={useNavigate()} location={useLocation()} />
};

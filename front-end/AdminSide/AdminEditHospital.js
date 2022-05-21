import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import HospitalService from "../Services/HospitalService";
import Navigation from "./Navigation";

class AdminEditHospital extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            hospitalId: this.props.location.state.hospitalId,
            history: this.props.history,
            hospital: {
                name: "Name",
                country: "Country",
                state: "State",
                city: "City",
                street: "Street",
                zipcode: "12345",
                emergencyNumber: "1234567890",
                generalNumber: "1234567891",
                raNumber: "1234567892",
            },
            oldEmergencyNumber: "1234567890",
            oldGeneralNumber: "1234567891",
            oldRaNumber: "1234567892",
        }
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
        if(this.state.hospitalId === -1) {
            HospitalService.saveHospital(this.state.hospital)
                .then(resp=>this.state.history("/admin/hospital"))
                .catch(e=>alert(e.response.data.message));
        } else {
            HospitalService.updateHospital(this.state.hospital)
                .then(resp=>this.state.history("/admin/hospital"))
                .catch(e=>alert(e.response.data.message));
        }
    }

    componentDidMount() {
        if(this.state.hospitalId !== -1) {
            HospitalService.getHospitalById(this.state.hospitalId).then(resp=>{
                this.setState({
                    hospital: resp.data,
                    oldEmergencyNumber: resp.data.emergencyNumber,
                    oldGeneralNumber: resp.data.generalNumber,
                    oldRaNumber: resp.data.raNumber,
                });
            }).catch(e=>console.log(e.response));
        }
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
                            <h3 className="text-center">{this.state.hospitalId==-1?"Add":"Edit"} Hospital</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>Name: </label>
                                    <input required className="form-control" type="text" value={this.state.hospital.name}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({hospital: {...prevState.hospital, name: event.target.value}}))}}/><br/>
                                    <label>Country: </label>
                                    <input required className="form-control" type="text" value={this.state.hospital.country}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({hospital: {...prevState.hospital, country: event.target.value}}))}}/><br/>
                                    <label>State: </label>
                                    <input required className="form-control" type="text" value={this.state.hospital.state}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({hospital: {...prevState.hospital, state: event.target.value}}))}}/><br/>
                                    <label>City: </label>
                                    <input required className="form-control" type="text" value={this.state.hospital.city}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({hospital: {...prevState.hospital, city: event.target.value}}))}}/><br/>
                                    <label>Street: </label>
                                    <input required className="form-control" type="text" value={this.state.hospital.street}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({hospital: {...prevState.hospital, street: event.target.value}}))}}/><br/>
                                    <label>Zipcode: </label>
                                    <input required className="form-control" type="text" value={this.state.hospital.zipcode}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({hospital: {...prevState.hospital, zipcode: event.target.value}}))}}/><br/>
                                    <label>Emergency Number: </label>
                                    <input required className="form-control" type="text" value={this.state.hospital.emergencyNumber}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({hospital: {...prevState.hospital, emergencyNumber: event.target.value}}))}}/><br/>
                                    <label>General Number: </label>
                                    <input required className="form-control" type="text" value={this.state.hospital.generalNumber}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({hospital: {...prevState.hospital, generalNumber: event.target.value}}))}}/><br/>
                                    <label>Registration and Administration Number: </label>
                                    <input required className="form-control" type="text" value={this.state.hospital.raNumber}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({hospital: {...prevState.hospital, raNumber: event.target.value}}))}}/><br/>
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
    return <AdminEditHospital {...props} history={useNavigate()} location={useLocation()} />
};

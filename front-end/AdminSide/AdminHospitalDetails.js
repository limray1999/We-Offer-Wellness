import React, {Component} from 'react';
import AdminHospital from "./AdminHospital";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import HospitalService from "../Services/HospitalService";
import Navigation from "./Navigation";

class AdminHospitalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            id: this.props.id.id,
            history: this.props.history,
            hospital: []
        }
    }
    componentDidMount() {
        HospitalService.getHospitalById(this.state.id).then(resp=>{
            this.setState({hospital: resp.data});
        })
    }

    render() {
        {console.log(this.state.hospital)}
        return (
            <div>
                {
                    !this.state.admin &&
                    <Navigate to="/admin/signin"/>
                }
                {
                    this.state.admin &&
                    <div>
                        <Navigation setAdmin={this.props.setAdmin} />
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                            <h3 className="text-center">Hospital Details</h3>
                            <div className="card-body">
                                <div style={{marginLeft: "100px"}}>
                                    <div>Name: {this.state.hospital.name}</div><br/>
                                    <div>Country: {this.state.hospital.country}</div><br/>
                                    <div>State: {this.state.hospital.state}</div><br/>
                                    <div>City: {this.state.hospital.city}</div><br/>
                                    <div>Street: {this.state.hospital.city}</div><br/>
                                    <div>Zipcode: {this.state.hospital.zipcode}</div><br/>
                                    <div>Emergency Number: {this.state.hospital.emergencyNumber}</div><br/>
                                    <div>General Number: {this.state.hospital.generalNumber}</div><br/>
                                    <div>Registration&Administration Number: {this.state.hospital.raNumber}</div><br/>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={()=>this.state.history("/admin/edithospital", {state: {hospitalId: this.state.id}})}>Edit</button>
                                    <button onClick={()=>this.state.history(-1)} style={{marginLeft: "150px"}} className='btn btn-secondary'>Back</button>
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
    return <AdminHospitalDetails {...props} history={useNavigate()} id={useParams()}/>
};

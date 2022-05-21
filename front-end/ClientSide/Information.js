import React, {Component} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            type: (this.props.user!==null)?(this.props.user.floor?"in":"out"):"",
            history: this.props.history
        };
    }

    render() {
        // console.log(this.state.history)
        return (
            <div style={{position: "relative"}}>
                {
                    this.state.user === null &&
                    <Navigate to="/signin"/>
                }
                {
                    this.state.user !== null &&
                    <div style={{position: "relative"}}>
                        <Navigation user={this.state.user} setUser={this.props.setUser} style={{zIndex: "20"}}/>
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                            <h3 className="text-center" >Personal Info</h3>
                            <div className="card-body">
                                <div style={{marginLeft: "100px"}}>
                                    <div>First Name: {this.state.user.firstName}</div><br/>
                                    <div>Middle Name: {this.state.user.middleName}</div><br/>
                                    <div>Last Name: {this.state.user.lastName}</div><br/>
                                    <div>Birth Date: {this.state.user.birthDate}</div><br/>
                                    <div>Blood Group: {this.state.user.bloodGroup}</div><br/>
                                    <div>Gender: {this.state.user.gender}</div><br/>
                                    <div>Marital Status: {this.state.user.maritalStatus}</div><br/>
                                    <div>Race: {this.state.user.race}</div><br/>
                                    <div>Phone Number: {this.state.user.phoneNumber}</div><br/>
                                    <div>Country: {this.state.user.country}</div><br/>
                                    <div>State: {this.state.user.state}</div><br/>
                                    <div>City: {this.state.user.city}</div><br/>
                                    <div>Street: {this.state.user.street}</div><br/>
                                    <div>Insurance Number: {this.state.user.insuranceNumber}</div><br/>
                                    <div>Insurance Company: {this.state.user.insuranceCompany}</div><br/>
                                    <div>
                                        Hospital Id: {this.state.user.hospital.id}
                                        <button style={{marginLeft: "20px"}} className="btn btn-info" onClick={()=>{this.state.history("/hospital/"+this.state.user.hospital.id)}}>View</button>
                                    </div><br/>
                                    {
                                        this.state.type === "out" &&
                                        <div>
                                            <div>Type: Out Patient</div><br/>
                                            <div>Follow Up Date: {this.state.user.followupDate}</div><br/>
                                        </div>
                                    }
                                    {
                                        this.state.type === "in" &&
                                        <div>
                                            <div>Type: In Patient</div><br/>
                                            <div>Admission Date: {this.state.user.admissionDate}</div><br/>
                                            <div>Bed Number: {this.state.user.bedNumber}</div><br/>
                                            <div>Floor: {this.state.user.floor}</div><br/>
                                            <div>Discharge Date: {this.state.user.dischargeDate}</div><br/>
                                        </div>
                                    }
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={()=>{this.state.history("/editinformation")}}>Edit</button>
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
    return <Information {...props} history={useNavigate()}/>
};

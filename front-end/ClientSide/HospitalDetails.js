import React, {Component} from 'react';
import Navigation from "./Navigation";
import {useNavigate, useParams} from "react-router-dom";
import HospitalService from "../Services/HospitalService";

class HospitalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            id: this.props.id.id,
            history: this.props.history,
            hospital: []
        }
    }

    componentDidMount() {
        HospitalService.getHospitalById(this.state.id).then((resp) => {
            this.setState({hospital: resp.data});
        });
    }

    render() {
        // console.log(this.state.id.id);
        return (
            <div>
                <Navigation user={this.state.user} setUser={this.props.setUser}/>
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
                            <button onClick={()=>this.state.history(-1)}  className='btn btn-secondary'>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (props) => {
    return <HospitalDetails {...props} history={useNavigate()} id={useParams()} />
}

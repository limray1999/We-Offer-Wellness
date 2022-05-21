import React, {Component} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import RegistrationService from "../Services/RegistrationService";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            history: this.props.history,
            registrations: [],
        }
    }

    componentDidMount() {
        if(this.state.user!==null) {
            RegistrationService.getByPatientId(this.state.user.id).then(resp => {
                this.setState({registrations: resp.data});
            })
        }

    }

    render() {
        //console.log(this.state.registrations);
        return (
            <div >
                {
                    this.state.user == null &&
                    <Navigate to="/signin"/>
                }

                {
                    this.state.user !== null &&
                    <div style={{position: "relative"}}>
                        <Navigation user={this.state.user} setUser={this.props.setUser}/>
                        <div style={{marginTop: "100px"}}>
                            <h2 className="text-center">Registration List</h2><br/>
                            <div className="float-end">
                                    <button style={{width: "auto"}} className="btn btn-primary" onClick={()=>{this.state.history("/addregistration")}}>add</button>
                            </div>
                            <div>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Registration Id</th>
                                        <th>Registration Date</th>
                                        <th>ICD</th>
                                        <th>Description</th>
                                        <th>Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.registrations.map(registration =>
                                        <tr key={registration.id}>
                                            <td>{registration.id}</td>
                                            <td>{registration.registrationDate}</td>
                                            <td>{registration.disease.icd}</td>
                                            <td>{registration.disease.description}</td>
                                            <td>
                                                <button className="btn btn-info" onClick={() => this.state.history("/treatment/"+registration.id)}>
                                                    View Treatments
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                }
            </div>
        );
    }
}

export default (props) => {
    return <Registration {...props} history={useNavigate()}/>
};

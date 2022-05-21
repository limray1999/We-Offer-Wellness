import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import RegistrationService from "../Services/RegistrationService";
import Navigation from "./Navigation";

class AdminRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            patientId: this.props.location.state.patientId,
            registrations: [],
            deleteWindow: false,
            registrationId: null
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        RegistrationService.getByPatientId(this.state.registrationId)
            .then(resp => {this.setState({
                registrations: this.state.registrations.filter(registration=>registration.id!==this.state.registrationId),
                deleteWindow: false,
                hospitalId: null,
            })}).catch(e => console.log(e.response));
    }

    componentDidMount() {
        RegistrationService.getByPatientId(this.state.patientId)
            .then(resp=>this.setState({registrations: resp.data}))
            .catch(e=>console.log(e.response))
    }

    render() {
        return (
            <div >
                {
                    !this.state.admin &&
                    <Navigate to="/admin/signin" />
                }

                {
                    this.state.admin &&
                    <div style={{position: "relative"}}>
                        <Navigation setAdmin={this.props.setAdmin}/>
                        <div style={{marginTop: "100px"}}>
                            <h2 className="text-center">Registration List</h2><br/>
                            <div className="float-end">
                                <button style={{width: "auto"}} className="btn btn-primary" onClick={()=>{this.state.history("/admin/addregistration", {state: {patientId: this.state.patientId}})}}>add</button>
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
                                                <button className="btn btn-info" onClick={() => {this.state.history("/admin/treatment", {state:{registrationId: registration.id, patientId: this.state.patientId}})}}>
                                                    Treatments
                                                </button>
                                                <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={()=>{this.setState({deleteWindow: true, registrationId: registration.id})}}>
                                                    Delete
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
                {
                    this.state.deleteWindow &&
                    <div>
                        <div className="card border-dark col-md-6 offset-md-2" style={{top: "200px", position: "absolute"}}>
                            <h3 className="text-center">Are you sure to delete this Hospital?</h3>
                            <br/><br/>
                            <div className="card-body">
                                <div className="text-center">
                                    <button className="btn btn-danger" onClick={()=>{this.handleDelete()}}>Delete</button>
                                    <button style={{marginLeft: "50px"}} className="btn btn-secondary" onClick={()=>{this.setState({deleteWindow: false, registrationId: null})}}>Back</button>
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
    return <AdminRegistration {...props} history={useNavigate()} location={useLocation()}/>
};

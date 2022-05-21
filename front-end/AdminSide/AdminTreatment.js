import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import TreatmentService from "../Services/TreatmentService";
import Navigation from "./Navigation";
import HospitalService from "../Services/HospitalService";

class AdminTreatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            registrationId: this.props.location.state.registrationId,
            patientId: this.props.location.state.patientId,
            treatments: [],
            deleteWindow: false,
            treatmentId: null
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        TreatmentService.deleteById(this.state.treatmentId).then(resp=>{
            this.setState({
                treatments: this.state.treatments.filter(treatment=>treatment.id!==this.state.treatmentId),
                deleteWindow: false,
                hospitalId: null,
            });
        })
    }

    componentDidMount() {
        TreatmentService.getByRegistrationId(this.state.registrationId)
            .then(resp=>this.setState({treatments: resp.data}))
            .catch(e=>console.log(e.response));
    }

    render() {
        return (
            <div>
                {
                    !this.state.admin &&
                    <Navigate to="/admin/signin"/>
                }
                {
                    this.state.user !== null &&
                    <div>
                        <Navigation setAdmin={this.props.setAdmin}/>
                        <div style={{marginTop: "100px"}}>
                            <h2 className="text-center">Treatment List</h2>
                            <div className="float-end">
                                <button style={{width: "auto"}} className="btn btn-primary" onClick={()=>{this.state.history("/admin/addtreatment", {state: {registrationId: this.state.registrationId, patientId: this.state.patientId}})}}>add</button>
                            </div>
                            <div>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Treatment Id</th>
                                        <th>Status</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Doctor Id</th>
                                        <th>Type</th>
                                        <th>Cost</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.treatments.map((treatment) =>
                                        <tr key={treatment.id}>
                                            <td>{treatment.id}</td>
                                            <td>{treatment.status}</td>
                                            <td>{treatment.startDate}</td>
                                            <td>{treatment.endDate}</td>
                                            <td>{treatment.doctor.id}</td>
                                            <td>{treatment.drugName?"Drug":(treatment.laboratoryName?"Laboratory":"Surgery")}</td>
                                            <td>{treatment.cost}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={()=>this.state.history("/admin/edittreatment", {state: {treatmentId: treatment.id}})}>Edit</button>
                                                <button style={{marginLeft: "50px"}} className="btn btn-danger" onClick={()=>this.setState({deleteWindow: true, treatmentId: treatment.id})}>Delete</button>
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
                                    <button style={{marginLeft: "50px"}} className="btn btn-secondary" onClick={()=>{this.setState({deleteWindow: false, treatmentId: null})}}>Back</button>
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
    return <AdminTreatment {...props} history={useNavigate()} location={useLocation()} />
};

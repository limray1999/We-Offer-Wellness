import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import TreatmentService from "../Services/TreatmentService";
import Navigation from "./Navigation";

class AdminEditTreatment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            treatmentId: this.props.location.state.treatmentId,
            treatment: {},
        }
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        TreatmentService.getById(this.state.treatmentId)
            .then(resp => this.setState({treatment: resp.data}))
            .catch(e => console.log(e.response));
    }

    handleSave() {
        if(this.state.treatment.drugName) {
            TreatmentService.updateDrug(this.state.treatment)
                .then(resp => this.state.history(-1))
                .catch(e => console.log(e.response.data.message));
        } else if(this.state.treatment.laboratoryName) {
            TreatmentService.updateLab(this.state.treatment)
                .then(resp => this.state.history(-1))
                .catch(e => console.log(e.response.data.message));
        } else {
            TreatmentService.updateSurgery(this.state.treatment)
                .then(resp => this.state.history(-1))
                .catch(e => console.log(e.response.data.message));
        }
    }

    render() {
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
                            <h3 className="text-center">Edit Treatment</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    {
                                        this.state.treatment.drugName &&
                                        <div>
                                            <div>Drug Name: {this.state.treatment.drugName}</div><br/>
                                            <div>Dose: {this.state.treatment.dose}</div><br/>
                                        </div>
                                    }
                                    {
                                        this.state.treatment.laboratoryName &&
                                        <div>
                                            <div>Lab Name: {this.state.treatment.laboratoryName}</div><br/>
                                            <div>Test Type: {this.state.treatment.testType}</div><br/>
                                            <div>Test Date: {this.state.treatment.testDate}</div><br/>
                                            <label>Lab Result: </label>
                                            <select
                                                required className="form-select" value={this.state.treatment.labResult?this.state.treatment.labResult:-1}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        treatment: {...prevState.treatment, labResult: event.target.value}
                                                    }))
                                                }}
                                            >
                                                <option key={-1} value={-1} disabled>---Make a selection---</option>
                                                <option key="positive" value="positive">Positive</option>
                                                <option key="negative" value="negative">Negative</option>
                                                <option key="potential" value="potential">Potential</option>
                                            </select><br/>
                                        </div>
                                    }
                                    {
                                        this.state.treatment.surgeryName &&
                                        <div>
                                            <div>Surgery Name: {this.state.treatment.surgeryName}</div><br/>
                                            <div>Description: {this.state.treatment.description}</div><br/>
                                            <div>Surgery Date: {this.state.treatment.surgeryDate}</div><br/>
                                            <label>Surgery Name: </label>
                                            <select
                                                required className="form-select" value={this.state.treatment.surgeryResult?this.state.treatment.surgeryResult:-1}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        treatment: {...prevState.treatment, surgeryResult: event.target.value}
                                                    }))
                                                }}
                                            >
                                                <option key={-1} value={-1} disabled>---Make a selection---</option>
                                                <option key="successful" value="successful">Successful</option>
                                                <option key="unsuccessful" value="unsuccessful">Unsuccessful</option>
                                            </select>
                                        </div>
                                    }
                                    <label>Treatment Status: </label>
                                    <select
                                        required className="form-select" value={this.state.treatment.status}
                                        onChange={(event) => {
                                            this.setState(prevState => ({treatment: {...prevState.treatment, status: event.target.value}}))
                                        }}
                                    >
                                        <option key="Follow-up" value="Follow-up">Follow-up</option>
                                        <option key="Completed" value="Completed">Completed</option>
                                        <option key="Terminated" value="Terminated">Terminated</option>
                                    </select>
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
    return <AdminEditTreatment {...props} history={useNavigate()} location={useLocation()} />
};

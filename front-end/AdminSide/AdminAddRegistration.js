import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import DiseaseService from "../Services/DiseaseService";
import RegistrationService from "../Services/RegistrationService";

class AdminAddRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            patientId: this.props.location.state.patientId,
            icd: null,
            icdList: []
        }
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        RegistrationService.addByPatientId(this.state.patientId, {icd: this.state.icd})
            .then(resp=>{this.state.history(-1)})
            .catch(e=>console.log(e.response));
    }

    componentDidMount() {
        DiseaseService.getDiseaseList()
            .then(resp=>this.setState({icdList: resp.data}))
            .catch(e=>console.log(e.response));
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
                            <h3 className="text-center">Add Registration</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>Disease: </label>
                                    <select className="form-select" onChange={(event)=>{this.setState({icd: event.target.value})}}>
                                        <option value="">--Make a Selection--</option>
                                        {
                                            this.state.icdList.map((disease)=>
                                            <option key={disease.icd} value={disease.icd}>
                                                {disease.name}
                                            </option>)
                                        }
                                    </select><br/>
                                    <div className="text-center">
                                        <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>
                                        <button style={{marginLeft: "150px"}} className="btn btn-danger" onClick={()=>{this.state.history(-1)}}>Cancel</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default (props) => {
    return <AdminAddRegistration {...props} history={useNavigate()} location={useLocation()} />
};

import React, {Component} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import DiseaseService from "../Services/DiseaseService";
import Registration from "./Registration";
import RegistrationService from "../Services/RegistrationService";

class AddRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            icd: null,
            history: this.props.history,
            icdList: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        if(this.state.icd===null) return;
        RegistrationService.addByPatientId(this.state.user.id, {icd: this.state.icd}).then((resp)=>{
            this.state.history("/registration");
        })
    }

    componentDidMount() {
        DiseaseService.getDiseaseList().then((resp)=>{this.setState({icdList: resp.data})})
    }

    render() {
        return (
            <div>
                {
                    !this.state.user &&
                    <Navigate to="/signin" />
                }
                {
                    this.state.user &&
                    <div>
                        <Navigation user={this.state.user} setUser={this.props.setUser}/>
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                            <h3 className="text-center">Add Registration</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>Disease: </label>
                                    <select className="form-select" onChange={(event)=>{this.setState({icd: event.target.value})}}>
                                        <option value="">--Make a Selection--</option>
                                        {this.state.icdList.map((disease)=>
                                        <option key={disease.icd} value={disease.icd}>
                                            {disease.description}
                                        </option>)}
                                    </select><br/>
                                    <div className="text-center">
                                        <button className="btn btn-primary" onClick={this.handleAdd}>Add</button>
                                        <button style={{marginLeft: "150px"}} className="btn btn-danger" onClick={()=>{this.state.history("/registration")}}>Cancel</button>
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

export default (props) =>{
    return <AddRegistration {...props} history={useNavigate()} />
};

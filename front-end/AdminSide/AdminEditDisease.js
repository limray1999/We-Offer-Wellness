import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import DiseaseService from "../Services/DiseaseService";

class AdminEditDisease extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            diseaseICD: this.props.location.state.diseaseICD,
            history: this.props.history,
            disease: {
                icd: "icd",
                description: "description",
                type: "type",
            },
        }
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
        if(this.state.diseaseICD === -1) {
            DiseaseService.saveDisease(this.state.disease)
                .then(resp=>this.state.history("/admin/disease"))
                .catch(e=>alert(e.response.data.message));
        } else {
            DiseaseService.updateDisease(this.state.disease)
                .then(resp=>this.state.history("/admin/disease"))
                .catch(e=>alert(e.response.data.message));
        }
    }

    componentDidMount() {
        if(this.state.diseaseICD !== -1) {
            DiseaseService.getByICD(this.state.diseaseICD)
                .then((resp)=>this.setState({disease: resp.data}))
                .catch(e=>console.log(e.response));
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
                            <h3 className="text-center">{this.state.diseaseICD==-1?"Add":"Edit"} Disease</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>ICD: </label>
                                    <input required className="form-control" type="text" value={this.state.disease.icd}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({disease: {...prevState.disease, icd: event.target.value}}))}}/><br/>
                                    <label>Description: </label>
                                    <input required className="form-control" type="text" value={this.state.disease.description}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({disease: {...prevState.disease, description: event.target.value}}))}}/><br/>
                                    <label>Type: </label>
                                    <input required className="form-control" type="text" value={this.state.disease.type}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({disease: {...prevState.disease, type: event.target.value}}))}}/><br/>
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
    return <AdminEditDisease {...props} history={useNavigate()} location={useLocation()}/>
};

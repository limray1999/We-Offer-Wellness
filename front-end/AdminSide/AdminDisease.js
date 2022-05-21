import React, {Component} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import DiseaseService from "../Services/DiseaseService";

class AdminDisease extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            history: this.props.history,
            deleteWindow: false,
            diseaseICD: null,
            diseaseList: [],
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        DiseaseService.deleteByICD(this.state.diseaseICD)
            .then(resp=>this.setState({
                diseaseList: this.state.diseaseList.filter(disease=>disease.icd!==this.state.diseaseICD),
                deleteWindow: false,
                diseaseICD: null,
            }))
            .catch(e=>console.log(e.response));
    }

    componentDidMount() {
        DiseaseService.getDiseaseList()
            .then(resp=>this.setState({diseaseList: resp.data}))
            .catch(e=>alert(e.response.data.message));
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
                        <Navigation setAdmin={this.props.setAdmin}/>
                        <div style={{marginTop: "100px"}}>
                            <h2 className="text-center">Disease List</h2>
                            <div className="float-end">
                                <button className="btn btn-primary" onClick={()=>this.state.history("/admin/editdisease", {state: {diseaseICD: -1}})}>Add</button>
                            </div>
                            <div>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>ICD</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.diseaseList.map((disease) =>
                                            <tr key={disease.icd}>
                                                <td>{disease.icd}</td>
                                                <td>{disease.name}</td>
                                                <td>{disease.type}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={()=>this.props.history("/admin/editdisease/", {state: {diseaseICD: disease.icd}})}>Edit</button>
                                                    <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={()=>this.setState({deleteWindow: true, diseaseICD: disease.icd})}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    }
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
                            <h3 className="text-center">Are you sure to delete this Disease?</h3>
                            <br/><br/>
                            <div className="card-body">
                                <div className="text-center">
                                    <button className="btn btn-danger" onClick={()=>{this.handleDelete()}}>Delete</button>
                                    <button style={{marginLeft: "50px"}} className="btn btn-secondary" onClick={()=>{this.setState({deleteWindow: false, diseaseICD: null})}}>Back</button>
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
    return <AdminDisease {...props} history={useNavigate()} />
};

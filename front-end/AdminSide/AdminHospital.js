import React, {Component} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import HospitalService from "../Services/HospitalService";

class AdminHospital extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            hospitalList: [],
            history: this.props.history,
            deleteWindow: false,
            hospitalId: null,
            searchBy: null,
            searchCondition: null,
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        HospitalService.deleteById(this.state.hospitalId).then(resp=>{
            this.setState({
                hospitalList: this.state.hospitalList.filter(hospital=>hospital.id!==this.state.hospitalId),
                deleteWindow: false,
                hospitalId: null,
            });
        })
    }

    componentDidMount() {
        HospitalService.getHospitals().then((resp=>{
            this.setState({hospitalList: resp.data});
        })).catch((e)=>{console.log(e)});
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
                            <h2 className="text-center">Hospital List</h2>
                            <div className="float-start">
                                <div className="input-group">
                                    <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        {this.state.searchBy?this.state.searchBy:"Filter"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#" onClick={()=>{
                                            HospitalService.getHospitals()
                                                .then(resp => {
                                                    this.setState({
                                                        hospitalList: resp.data,
                                                        searchBy: null,
                                                        searchCondition: null,
                                                    })
                                                })
                                        }}>reset</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "state"})}}>state</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "zipcode"})}}>zipcode</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "name"})}}>name</a></li>
                                    </ul>
                                    <input type="text" className="form-control"
                                           value={this.state.searchCondition?this.state.searchCondition:""}
                                           onChange = {(event) => {this.setState({searchCondition: event.target.value})}}
                                    />
                                    <button className="btn btn-outline-secondary"
                                            onClick={()=>{
                                                if(this.state.searchBy==="state") {
                                                    HospitalService.getHospitalByState(this.state.searchCondition)
                                                        .then(resp => {this.setState({hospitalList: resp.data})})
                                                        .catch(e=>console.log(e.response));
                                                } else if(this.state.searchBy==="zipcode") {
                                                    HospitalService.getHospitalByZipcode(this.state.searchCondition)
                                                        .then(resp => {this.setState({hospitalList: resp.data})})
                                                        .catch(e=>console.log(e.response));
                                                } else if(this.state.searchBy==="name") {
                                                    HospitalService.getHospitalByName(this.state.searchCondition)
                                                        .then(resp => {this.setState({hospitalList: resp.data})})
                                                        .catch(e=>console.log(e.response));
                                                }
                                            }}
                                    >
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="float-end">
                                <button className="btn btn-primary" onClick={()=>this.state.history("/admin/edithospital", {state: {hospitalId: -1}})}>Add</button>
                            </div>
                            <div>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Hospital Name</th>
                                        <th>Emergency Number</th>
                                        <th>General Number</th>
                                        <th>Registration&Administration Number</th>
                                        <th>State</th>
                                        <th>Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.hospitalList.map((hospital) =>
                                            <tr key={hospital.id}>
                                                <td>{hospital.name}</td>
                                                <td>{hospital.emergencyNumber}</td>
                                                <td>{hospital.generalNumber}</td>
                                                <td>{hospital.raNumber}</td>
                                                <td>{hospital.state}</td>
                                                <td>
                                                    <button className="btn btn-info" onClick={()=>this.props.history("/admin/hospital/"+hospital.id)}>View</button>
                                                    <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={()=>this.setState({deleteWindow: true, hospitalId: hospital.id})}>Delete</button>
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
                            <h3 className="text-center">Are you sure to delete this Hospital?</h3>
                            <br/><br/>
                            <div className="card-body">
                                <div className="text-center">
                                    <button className="btn btn-danger" onClick={()=>{this.handleDelete()}}>Delete</button>
                                    <button style={{marginLeft: "50px"}} className="btn btn-secondary" onClick={()=>{this.setState({deleteWindow: false, hospitalId: null})}}>Back</button>
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
    return <AdminHospital {...props} history={useNavigate()} />
};

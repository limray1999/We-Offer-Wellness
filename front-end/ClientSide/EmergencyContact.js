import React, {Component} from 'react';
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import ECService from "../Services/ECService";

class EmergencyContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            history: this.props.history,
            ecList: [],
            deleteWindow: false,
            ecId: null,
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        ECService.deleteByECId(this.state.ecId)
            .then((resp)=>{this.setState(
                {
                    deleteWindow: false,
                    ecList: this.state.ecList.filter(ec => ec.id!==this.state.ecId),
                    ecId: null,
                })})
            .catch((e)=>console.log(e));
        // console.log(this.state.ecList);
    }

    componentDidMount() {
        if(this.state.user) {
            ECService.getByPatientId(this.state.user.id).then((resp)=>{
                this.setState({ecList: resp.data});
            })
        }
    }

    render() {
        return (
            <div>
                {
                    !this.state.user &&
                    <Navigate to="/signin"/>
                }
                {
                    this.state.user &&
                    <div>
                        <Navigation user={this.state.user} setUser={this.props.setUser} />
                        <div style={{marginTop: "100px"}}>
                            <h2 className="text-center">Emergency Contact List</h2>
                            <div className="float-end">
                                <button style={{width: "auto"}} className="btn btn-primary" onClick={()=>{this.state.history("/viewemergencycontact", {state: {ecId: -1}})}}>add</button>
                            </div>
                            <div>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Number</th>
                                        <th>Relationship</th>
                                        <th>Phone Number</th>
                                        <th>Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.ecList.map((ec) =>
                                            <tr key={ec.id}>
                                                <td>{ec.firstName}</td>
                                                <td>{ec.lastName}</td>
                                                <td>{ec.relationship}</td>
                                                <td>{ec.phoneNumber}</td>
                                                <td>
                                                    <button className="btn btn-info" onClick={()=>this.props.history("/viewemergencycontact", {state: {ecId: ec.id}})}>View</button>
                                                    <button style={{marginLeft: "10px"}} className="btn btn-danger" onClick={()=>{this.setState({deleteWindow: true, ecId: ec.id})}}>Delete</button>
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
                            <h3 className="text-center">Are you sure to delete this emergency contact?</h3>
                            <br/><br/>
                            <div className="card-body">
                                <div className="text-center">
                                    <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                                    <button style={{marginLeft: "50px"}} className="btn btn-secondary" onClick={()=>{this.setState({deleteWindow: false, ecId: null})}}>Back</button>
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
    return <EmergencyContact {...props} history={useNavigate()} />
};

import React, {Component} from 'react';
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import ECService from "../Services/ECService";

class ViewEmergencyContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            ecId: this.props.location.state.ecId,
            ec: {firstName: "First Name",
                middleName: "Middle Name",
                lastName: "Last Name",
                relationship: "Relationship",
                phoneNumber: "1234567890",
                country: "Country",
                state: "State",
                city: "City",
                street: "Street",
                zipcode: "12345",
                patient: this.props.user},
            history: this.props.history,
        }
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave() {
        // console.log(this.state.ec);
        if(this.state.ecId===-1) {
            ECService.saveEC(this.state.ec).then((resp)=>{
                this.state.history("/emergencycontact");
            }).catch((e)=>{console.log(e.response)})
        } else {
            ECService.updateEC(this.state.ec).then((resp)=>{
                this.state.history("/emergencycontact");
            }).catch((e)=>{console.log(e.response)});
        }

    }

    componentDidMount() {
        if(this.state.ecId!==-1) {
            ECService.getByECId(this.state.ecId).then((resp)=>{
                this.setState({ec: resp.data});
            });
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
                        <Navigation user={this.state.user} setUser={this.props.setUser}/>
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                            <h3 className="text-center">Emergency Contact</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>First Name: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.firstName}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, firstName: event.target.value}}))}}/><br/>
                                    <label>Middle Name: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.middleName?this.state.ec.middleName:""}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, middleName: event.target.value}}))}}/><br/>
                                    <label>Last Name: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.lastName}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, lastName: event.target.value}}))}}/><br/>
                                    <label>Relationship: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.relationship}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, relationship: event.target.value}}))}}/><br/>
                                    <label>Phone Number: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.phoneNumber}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, phoneNumber: event.target.value}}))}}/><br/>
                                    <label>Country: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.country}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, country: event.target.value}}))}}/><br/>
                                    <label>State: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.state}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, state: event.target.value}}))}}/><br/>
                                    <label>City: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.city}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, city: event.target.value}}))}}/><br/>
                                    <label>Street: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.street}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, street: event.target.value}}))}}/><br/>
                                    <label>Zipcode: </label>
                                    <input required className="form-control" type="text" value={this.state.ec.zipcode}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({ec: {...prevState.ec, zipcode: event.target.value}}))}}/><br/>
                                </form>
                                <div className="text-center">
                                    <button className="btn btn-success" onClick={this.handleSave}>Save</button>
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
    return <ViewEmergencyContact {...props} history={useNavigate()} location={useLocation()} />
};

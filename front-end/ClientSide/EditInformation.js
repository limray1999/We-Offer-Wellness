import React, {Component} from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";
import PatientService from "../Services/PatientService";

class EditInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            history: this.props.history,
            oldPhoneNumber: !this.props.user?null:this.props.user.phoneNumber,
        }
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(event) {
        //console.log(event);
        //console.log(this.state.user.firstName);
        if(this.state.user.firstName=="") {
            alert("First Name can not be empty!");
            return;
        } else if(this.state.user.lastName=="") {
            alert("Last Name can not be empty!")
            return;
        } else if(this.state.maritalStatus=="") {
            alert("Marital Status can not be empty!")
            return;
        } else if(this.state.phoneNumber=="") {
            alert("Phone Number can not be empty！")
            return;
        } else if(this.state.country=="") {
            alert("Country can not be empty！")
            return;
        } else if(this.state.state=="") {
            alert("State can not be empty！")
            return;
        } else if(this.state.city=="") {
            alert("City can not be empty！")
            return;
        } else if(this.state.street=="") {
            alert("Street can not be empty！")
            return;
        }
        // console.log(this.state.user);
        this.props.setUser(this.state.user);
        if(this.state.user.floor!==null) {
            PatientService.updateOut(this.state.user).then((resp)=> {
                console.log(resp);
                this.state.history("/information")
            }).catch((e)=> {
                const oldPhoneNumber = this.state.oldPhoneNumber;
                alert(e.response.data.message);
                this.setState((prevState)=>({user: {...prevState.user, phoneNumber: oldPhoneNumber}}))
            });
        } else {
            PatientService.updateIn(this.state.user).then((resp)=>this.state.history("/information")).catch((e)=>console.log(e));
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
                            <h3 className="text-center">Edit Personal Information</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>First Name: </label>
                                    <input required className="form-control" type="text" value={this.state.user.firstName}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({user: {...prevState.user, firstName: event.target.value}}))}}/><br/>
                                    <label>Middle Name: </label>
                                    <input required className="form-control" type="text" value={this.state.user.middleName?this.state.user.middleName:""}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({user: {...prevState.user, middleName: event.target.value}}))}}/><br/>
                                    <label>Last Name: </label>
                                    <input required className="form-control" type="text" value={this.state.user.lastName}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({user: {...prevState.user, lastName: event.target.value}}))}}/><br/>
                                    <label>Marital Status: </label>
                                    <input required className="form-control" type="text" value={this.state.user.maritalStatus}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({user: {...prevState.user, maritalStatus: event.target.value}}))}}/><br/>
                                    <label>Phone Number: </label>
                                    <input required className="form-control" type="text" value={this.state.user.phoneNumber}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({user: {...prevState.user, phoneNumber: event.target.value}}))}}/><br/>
                                    <label>Country: </label>
                                    <input required className="form-control" type="text" value={this.state.user.country}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({user: {...prevState.user, country: event.target.value}}))}}/><br/>
                                    <label>State: </label>
                                    <input required className="form-control" type="text" value={this.state.user.state}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({user: {...prevState.user, state: event.target.value}}))}}/><br/>
                                    <label>City: </label>
                                    <input required className="form-control" type="text" value={this.state.user.city}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({user: {...prevState.user, city: event.target.value}}))}}/><br/>
                                    <label>Street: </label>
                                    <input required className="form-control" type="text" value={this.state.user.street}
                                           onChange={(event)=>
                                           {this.setState((prevState)=>({user: {...prevState.user, street: event.target.value}}))}}/><br/>
                                </form>
                                <div className="text-center">
                                    <button className="btn btn-success" onClick={this.handleSave}>Save</button>
                                    <button style={{marginLeft: "100px"}} className="btn btn-danger" onClick={()=>{this.state.history("/information")}}>Cancel</button>
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
    return <EditInformation {...props} history={useNavigate()}/>
};

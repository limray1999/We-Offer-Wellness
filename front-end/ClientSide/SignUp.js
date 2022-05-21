import React from "react";
import { ImCheckmark, ImCross } from 'react-icons/im';
import Navigation from "./Navigation";
import {Navigate, useNavigate} from "react-router-dom";
import AccountService from "../Services/AccountService";
import PatientService from "../Services/PatientService";

class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            history: this.props.history,
            email: "",
            password: "",
            confirmPassword: "",
            patientId: "",
            isValid: false,
            emailUsed: false,
            patientExists: true,
            patientUsed: false,
            patient: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        if(event.target.name === "email") {
            AccountService.getByEmail(event.target.value).then(resp => {
                this.setState({emailUsed: resp.data.length!==0});
            });
        } else if(event.target.name === "patientId") {
            AccountService.getByPatientId(event.target.value).then(resp => {
                this.setState({patientUsed: resp.data});
            });
            PatientService.existsById(event.target.value).then(resp => {
                this.setState({patientExists: resp.data});
                //console.log(resp.data);
            });
            PatientService.getById(event.target.value).then(resp => {
                this.setState({patient: resp.data})
            })
        }
    }

    handleClick(event) {
        if(this.state.patientId === "") return;
        if(this.state.emailUsed) {
            alert("This email has been registered");
            return;
        }
        if(this.state.patientUsed) {
            alert("This patient id has been registered");
            return;
        }
        if(!this.state.patientExists) {
            alert("This patient id does not exist");
            return;
        }
        if(this.state.password !== "" && this.state.password === this.state.confirmPassword) {
            this.setState({isValid: true});
            if(this.state.patientId !== "") {
                const newAccount =
                    {
                        email: this.state.email,
                        password: this.state.password,
                        patientId: this.state.patientId
                    };
                AccountService.saveNewAccount(newAccount).then(resp=>{});
            }
        } else if(this.state.password !== this.state.confirmPassword) {
            alert("Two passwords do not match!");
        }
    }


    render() {
        return (
            <div>
                <Navigation />
                {
                    this.state.isValid &&
                    <Navigate to="/signin" />
                }
                {
                    <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                        <h3 className="text-center">Sign Up</h3>
                        <div className="card-body">
                            <form onSubmit={event=>event.preventDefault()}>
                                <label>Enter your email: </label>
                                <input className="form-control" required type="email" name="email" onChange={this.handleChange}/><br /><br />
                                <label>Set you password: </label>
                                <input className="form-control" required type="password" name="password" onChange={this.handleChange}/><br /><br />
                                <label>Confirm password: </label>
                                <input className="form-control" required type="password" name="confirmPassword" onChange={this.handleChange} />
                                {
                                    this.state.password === this.state.confirmPassword &&
                                    <span>
                                {" "}<ImCheckmark> </ImCheckmark>
                            </span>

                                }
                                {
                                    this.state.password !== this.state.confirmPassword &&
                                    <span>
                                {" "}<ImCross> </ImCross>
                            </span>

                                }<br /><br />
                                <label>Enter your patient id: </label>
                                <input className="form-control" required type="number" name="patientId" onChange={this.handleChange}/><br/><br/>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={this.handleClick}>Sign Up</button>
                                    <button style={{marginLeft: "100px"}} className="btn btn-secondary" onClick={()=>{this.state.history(-1)}}>Back</button>
                                </div>

                                {/*<input type="submit" name="signUp" value="Sign Up"/>*/}
                            </form>
                        </div>

                    </div>
                }

            </div>
        );
    }
}

export default (props) => {
    return <SignUp {...props} history={useNavigate()}/>
};

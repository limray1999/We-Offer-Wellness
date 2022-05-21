import React from "react";
import Navigation from "./Navigation";
import "./SignIn.css"
import {Link, Navigate} from "react-router-dom";
import AccountService from "../Services/AccountService";
import PatientService from "../Services/PatientService";


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            email: "",
            password: "",
            emailExists: false,
            matches: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        //this.state.username = event.target.value;
        this.setState({[event.target.name]: event.target.value});
    }

    handleClick() {
        //console.log("click");
        AccountService.getByEmail(this.state.email).then(resp => {
            this.setState({emailExists: resp.data.length!==0});
            if(resp.data.length!==0) {
                if(resp.data.password === this.state.password) {
                    this.setState({matches: true});
                    this.setState({user: resp.data});
                    PatientService.getById(resp.data.patient.id).then(r => {
                        this.props.setUser(r.data);
                        // console.log(r.data);
                    })
                    return;
                } else {
                    alert("Wrong password!");
                    return;
                }
            } else {
                alert("This email has not been registered!");
                return;
            }
        });

    }

    render() {
        return (
            <div>
                {
                    this.state.matches &&
                    <Navigate to="/" />
                }
                {
                    !this.state.matches &&
                    <div>
                        <Navigation user={this.state.user} setUser={this.props.setUser}/>
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                            <h3 className="text-center">Sign In</h3>
                            <div className="card-body">
                                <form onSubmit={event => event.preventDefault()}>
                                    <label>Email: </label>
                                    <input className="form-control" type="email" name="email" onChange={this.handleChange} required /><br/>
                                    <label>Password: </label>
                                    <input className="form-control" type="password" name="password" onChange={this.handleChange} required/><br/><br/>
                                    <div className="text-center">
                                        <button className="btn btn-primary" onClick={this.handleClick}>Sign In</button><br/>
                                        <p>Do not have an account? <Link to="/signup" className="SignUpLink">Sign Up Here</Link> </p>
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

export default SignIn;

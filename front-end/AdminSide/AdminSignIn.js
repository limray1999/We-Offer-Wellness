import React from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import AccountService from "../Services/AccountService";
import AdminService from "../Services/AdminService";


class AdminSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            username: "",
            password: "",
            history: this.props.history,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClick() {
        AdminService.getPasswordByUsername(this.state.username).then((resp)=>{
            if(resp.data.length===0) {
                alert("Username does not exist!");
            } else {
                //console.log(typeof (resp.data));
                //console.log(typeof (this.state.password));
                //console.log(resp.data==this.state.password);
                if(resp.data==this.state.password) {
                    this.setState({admin: true});
                    this.props.setAdmin(true);
                    this.state.history("/admin/home");
                } else {
                    alert("Wrong password!");
                }
            }
        }).catch((e)=>{console.log(e.response)})
    }

    render() {
        return (
            <div>
                <div>
                    <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                        <h3 className="text-center">Admin Sign In</h3>
                        <div className="card-body">
                            <form onSubmit={event => event.preventDefault()}>
                                <label>Username: </label>
                                <input className="form-control" type="text" name="username" onChange={this.handleChange} required /><br/>
                                <label>Password: </label>
                                <input className="form-control" type="password" name="password" onChange={this.handleChange} required/><br/><br/>
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={this.handleClick}>Sign In</button><br/>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        );

    }
}

export default (props) => {
    return <AdminSignIn {...props} history={useNavigate()}/>
};

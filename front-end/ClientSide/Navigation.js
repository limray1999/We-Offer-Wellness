import {Link} from "react-router-dom";
import "./Navigation.css"
import React from "react";

class Navigation extends React.Component{
    constructor(props) {
        super(props);

        this.state = {showUser: false};
    }

    render() {
        //console.log(this.props.user);

        return (
            <div className="Navigation">
                <div className="NavLeft">
                    <Link to="/" className="NavLeftLink">home</Link>
                    <Link to="/about" className="NavLeftLink">about</Link>
                    <Link to="/hospital" className="NavLeftLink">hospital</Link>
                    <Link to="/doctor" className="NavLeftLink">doctor</Link>
                </div>
                {
                    this.props.user == null &&
                    <div className="NavRight">
                        <Link to="/signin" className="NavRightLink">Sign In</Link>
                    </div>
                }
                {
                    this.props.user != null &&
                    <div>
                        <div className="NavRight">
                            <Link to="#" className="NavRightLink" onClick={()=>this.setState({showUser: !this.state.showUser})}>{this.props.user.firstName}</Link>
                        </div>
                        <div className={this.state.showUser ? 'userInfoActive' : 'userInfo'} >
                            <Link to="/information" className="NavRightLink">Information</Link><br/>
                            <Link to="/registration" className="NavRightLink">Registration</Link><br/>
                            <Link to="/emergencycontact" className="NavRightLink">Emergency Contact</Link><br/>
                            <Link to="/invoice" className="NavRightLink">Bill</Link><br/>
                            <Link to="/payment" className="NavRightLink">Payment History</Link><br/>
                            <Link to="/" className="NavRightLink" onClick={()=>this.props.setUser(null)}>Log out</Link>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Navigation;

import {Link} from "react-router-dom";
import "./Navigation.css"
import React from "react";

class Navigation extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Navigation">
                <div className="NavLeft">
                    <Link to="/admin/home" className="NavLeftLink">home</Link>
                    <Link to="/admin/hospital" className="NavLeftLink">hospital</Link>
                    <Link to="/admin/disease" className="NavLeftLink">disease</Link>
                    <Link to="/admin/doctor" className="NavLeftLink">doctor</Link>
                    <Link to="/admin/patient" className="NavLeftLink">patient</Link>
                    <Link to="/admin/invoice" className="NavLeftLink">invoice</Link>
                    <Link to="/admin/payment" className="NavLeftLink">payment</Link>
                </div>
                <div>
                    <div className="NavRight">
                        <Link to="/admin/signin" className="NavRightLink" onClick={()=>this.props.setAdmin(false)}>Log out</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;

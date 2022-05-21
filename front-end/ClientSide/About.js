import React from "react";
import Navigation from "./Navigation";


class About extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Navigation user={this.props.user} setUser={this.props.setUser}/>
        );
    }
}

export default About;

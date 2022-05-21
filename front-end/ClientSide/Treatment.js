import React from "react";
import {Navigate, useParams} from "react-router-dom";
import Navigation from "./Navigation";
import TreatmentService from "../Services/TreatmentService";

class Treatment extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                user: this.props.user,
                id: this.props.id.id,
                treatments: [],
            }
    }

    componentDidMount() {
        TreatmentService.getByRegistrationId(this.state.id).then(resp => {
            this.setState({treatments: resp.data});
        })
    }

    render() {
        // {console.log(this.state.treatments)}
        return (
                <div>
                    {
                        this.state.user === null &&
                        <Navigate to="/signin"/>
                    }
                    {
                        this.state.user !== null &&
                        <div>
                            <Navigation user={this.state.user} setUser={this.props.setUser}/>
                            <div style={{marginTop: "100px"}}>
                                <h2 className="text-center">Treatment List</h2>
                                <div className="row">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                        <tr>
                                            <th>Treatment Id</th>
                                            <th>Status</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Doctor Id</th>
                                            <th>Type</th>
                                            <th>Cost</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.treatments.map((treatment) =>
                                            <tr key={treatment.id}>
                                                <td>{treatment.id}</td>
                                                <td>{treatment.status}</td>
                                                <td>{treatment.startDate}</td>
                                                <td>{treatment.endDate}</td>
                                                <td>{treatment.doctor.id}</td>
                                                <td>{treatment.drugName?"Drug":(treatment.laboratoryName?"Laboratory":"Surgery")}</td>
                                                <td>{treatment.cost}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            );

    }
}

export default (props) => {
    return <Treatment {...props} id={useParams()}/>
};

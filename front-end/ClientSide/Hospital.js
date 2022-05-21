import Navigation from "./Navigation";
import React from "react";
import HospitalService from "../Services/HospitalService";
import {useNavigate} from "react-router-dom";

class Hospital extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hospitalList: [],
            searchBy: null,
            searchCondition: null,
        }
    }

    componentDidMount() {
        HospitalService.getHospitals().then((resp) => {
            this.setState({hospitalList: resp.data});
        });
    }

    render() {
        //console.log(this.state.hospitalList);
        return (
            <div style={{position: "relative"}}>
                <Navigation user={this.props.user} setUser={this.props.setUser}/>
                <div style={{marginTop: "100px"}}>
                    <h2 className="text-center">Hospital List</h2>
                    <div className="float-start">
                        <div className="input-group">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                {this.state.searchBy?this.state.searchBy:"Filter"}
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={()=>{
                                    HospitalService.getHospitals()
                                        .then(resp => {
                                            this.setState({
                                                hospitalList: resp.data,
                                                searchBy: null,
                                                searchCondition: null,
                                            })
                                        })
                                }}>reset</a></li>
                                <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "state"})}}>state</a></li>
                                <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "zipcode"})}}>zipcode</a></li>
                                <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "name"})}}>name</a></li>
                            </ul>
                            <input type="text" className="form-control"
                                   value={this.state.searchCondition?this.state.searchCondition:""}
                                   onChange = {(event) => {this.setState({searchCondition: event.target.value})}}
                            />
                            <button className="btn btn-outline-secondary"
                                    onClick={()=>{
                                        if(this.state.searchBy==="state") {
                                            HospitalService.getHospitalByState(this.state.searchCondition)
                                                .then(resp => {this.setState({hospitalList: resp.data})})
                                                .catch(e=>console.log(e.response));
                                        } else if(this.state.searchBy==="zipcode") {
                                            HospitalService.getHospitalByZipcode(this.state.searchCondition)
                                                .then(resp => {this.setState({hospitalList: resp.data})})
                                                .catch(e=>console.log(e.response));
                                        } else if(this.state.searchBy==="name") {
                                            HospitalService.getHospitalByName(this.state.searchCondition)
                                                .then(resp => {this.setState({hospitalList: resp.data})})
                                                .catch(e=>console.log(e.response));
                                        }
                                    }}
                            >
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th>Hospital Name</th>
                                <th>Emergency Number</th>
                                <th>General Number</th>
                                <th>Registration&Administration Number</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.hospitalList.map((hospital) =>
                                    <tr key={hospital.id}>
                                        <td>{hospital.name}</td>
                                        <td>{hospital.emergencyNumber}</td>
                                        <td>{hospital.generalNumber}</td>
                                        <td>{hospital.raNumber}</td>
                                        <td><button className="btn btn-info" onClick={()=>this.props.history("/hospital/"+hospital.id)}>View</button></td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default (props) => {
    return <Hospital {...props} history = {useNavigate()}/>
};

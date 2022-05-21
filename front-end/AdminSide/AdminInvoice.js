import React, {Component} from 'react';
import {Navigate} from "react-router-dom";
import InvoiceService from "../Services/InvoiceService";
import Navigation from "./Navigation";
import HospitalService from "../Services/HospitalService";
import PatientService from "../Services/PatientService";

class AdminInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            invoiceList: [],
            searchBy: null,
            searchCondition: null,
        }
    }

    componentDidMount() {
        InvoiceService.getInvoices()
            .then(resp => this.setState({invoiceList: resp.data}))
            .catch(e => console.log(e.response.data.message));
    }

    render() {
        return (
            <div>
                {
                    !this.state.admin &&
                    <Navigate to="/admin/signin" />
                }
                {
                    this.state.admin &&
                    <div>
                        <Navigation setAdmin={this.props.setAdmin}/>
                        <div style={{marginTop: "100px"}}>
                            <h2 className="text-center">Invoice List</h2>
                            <div className="float-start">
                                <div className="input-group">
                                    <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        {this.state.searchBy?this.state.searchBy:"Filter"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#" onClick={()=>{
                                            InvoiceService.getInvoices()
                                                .then(resp => {
                                                    this.setState({
                                                        invoiceList: resp.data,
                                                        searchBy: null,
                                                        searchCondition: null,
                                                    })
                                                })
                                        }}>reset</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "invoiceId"})}}>invoice id</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "treatmentId"})}}>treatment id</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "patientId"})}}>patient id</a></li>
                                    </ul>
                                    <input type="text" className="form-control"
                                           value={this.state.searchCondition?this.state.searchCondition:""}
                                           onChange = {(event) => {this.setState({searchCondition: event.target.value})}}
                                    />
                                    <button className="btn btn-outline-secondary"
                                            onClick={()=>{
                                                if(this.state.searchBy==="invoiceId") {
                                                    InvoiceService.getById(this.state.searchCondition)
                                                        .then(resp => {this.setState({invoiceList: resp.data})})
                                                        .catch(e=>console.log(e.response));
                                                } else if(this.state.searchBy==="treatmentId") {
                                                    InvoiceService.getByTreatmentId(this.state.searchCondition)
                                                        .then(resp => {this.setState({invoiceList: resp.data})})
                                                        .catch(e=>console.log(e.response));
                                                } else if(this.state.searchBy==="patientId") {
                                                    InvoiceService.getByPatientId(this.state.searchCondition)
                                                        .then(resp => {this.setState({invoiceList: resp.data})})
                                                        .catch(e => console.log(e.response));
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
                                        <th>Id</th>
                                        <th>Date</th>
                                        <th>Total Cost</th>
                                        <th>Need to Pay</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.invoiceList.map((invoice) =>
                                            <tr key={invoice.id}>
                                                <td>{invoice.id}</td>
                                                <td>{invoice.invoiceDate}</td>
                                                <td>{invoice.totalCost}</td>
                                                <td>{invoice.needToPay}</td>
                                            </tr>
                                        )
                                    }
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

export default AdminInvoice;

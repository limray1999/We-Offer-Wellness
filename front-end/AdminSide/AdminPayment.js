import React, {Component} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import PaymentService from "../Services/PaymentService";
import Navigation from "./Navigation";
import InvoiceService from "../Services/InvoiceService";

class AdminPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: this.props.admin,
            paymentList: [],
            searchBy: null,
            searchCondition: null,
        }
    }

    componentDidMount() {
        PaymentService.getPayments()
            .then(resp => this.setState({paymentList: resp.data}))
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
                            <h2 className="text-center">Payment List</h2>
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
                                                        paymentList: resp.data,
                                                        searchBy: null,
                                                        searchCondition: null,
                                                    })
                                                })
                                        }}>reset</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "invoiceId"})}}>invoice id</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={()=>{this.setState({searchBy: "patientId"})}}>patient id</a></li>
                                    </ul>
                                    <input type="text" className="form-control"
                                           value={this.state.searchCondition?this.state.searchCondition:""}
                                           onChange = {(event) => {this.setState({searchCondition: event.target.value})}}
                                    />
                                    <button className="btn btn-outline-secondary"
                                            onClick={()=>{
                                                if(this.state.searchBy==="invoiceId") {
                                                    PaymentService.getByInvoiceId(this.state.searchCondition)
                                                        .then(resp => {this.setState({paymentList: resp.data})})
                                                        .catch(e=>console.log(e.response));
                                                } else if(this.state.searchBy==="patientId") {
                                                    PaymentService.getByPatientId(this.state.searchCondition)
                                                        .then(resp => {this.setState({paymentList: resp.data})})
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
                                        <th>Id</th>
                                        <th>Date</th>
                                        <th>Account Number</th>
                                        <th>Bank Name</th>
                                        <th>Amount</th>
                                        <th>Notes</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.paymentList.map((payment) =>
                                            <tr key={payment.id}>
                                                <td>{payment.id}</td>
                                                <td>{payment.paymentDate}</td>
                                                <td>{payment.accountNumber}</td>
                                                <td>{payment.bankName}</td>
                                                <td>{payment.amount}</td>
                                                <td>{payment.notes}</td>
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

export default AdminPayment;

import React, {Component} from 'react';
import InvoiceService from "../Services/InvoiceService";
import {Navigate, useNavigate} from "react-router-dom";
import Navigation from "./Navigation";

class Invoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            invoices: [],
            history: this.props.history,
        }
    }

    componentDidMount() {
        if(this.state.user !== null) {
            InvoiceService.getByPatientId(this.state.user.id).then((resp) => {
                this.setState({invoices: resp.data});
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.user === null &&
                    <Navigate to="/signin" />
                }
                {
                    this.state.user !== null &&
                    <div>
                        <Navigation user={this.state.user} setUser={this.props.setUser} />
                        <div style={{marginTop: "100px"}}>
                            <h2 className="text-center">Invoice List</h2>
                            <table className="table table-striped table-bordered">
                                <thead>
                                <tr>
                                    <th>Invoice Id</th>
                                    <th>Total Cost</th>
                                    <th>Need to Pay</th>
                                    <th>Treatment Id</th>
                                    <th>Invoice Date</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.invoices.map((invoice) =>
                                    <tr key={invoice.id}>
                                        <td>{invoice.id}</td>
                                        <td>{invoice.totalCost}</td>
                                        <td>{invoice.needToPay}</td>
                                        <td>{invoice.treatment.id}</td>
                                        <td>{invoice.invoiceDate}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=>this.state.history("/makepayment", {state: {invoiceId: invoice.id, needToPay: invoice.needToPay}})}>pay</button>
                                        </td>
                                    </tr>
                                )}
                                </tbody>

                            </table>
                        </div>

                    </div>
                }
            </div>
        );
    }
}

export default (props) => {
    return <Invoice {...props} history={useNavigate()} />
};

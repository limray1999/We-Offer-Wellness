import React, {Component} from 'react';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import Navigation from "./Navigation";
import PaymentService from "../Services/PaymentService";


class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            payments: [],
            history: this.props.history,
        }
    }

    componentDidMount() {
        if(this.state.user!==null) {
            PaymentService.getByPatientId(this.state.user.id).then((resp) => {
                this.setState({payments: resp.data});
            })
        }

    }

    render() {
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
                            <h2 className="text-center">PaymentList</h2>
                            <div className="row">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Payment Id</th>
                                        <th>Method</th>
                                        <th>Amount</th>
                                        <th>Account Number</th>
                                        <th>Bank Name</th>
                                        <th>Invoice Id</th>
                                        <th>Notes</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.payments.map((payment) =>
                                        <tr key={payment.id}>
                                            <td>{payment.id}</td>
                                            <td>{payment.paymentMethod}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.accountNumber}</td>
                                            <td>{payment.bankName}</td>
                                            <td>{payment.invoice.id}</td>
                                            <td>{payment.notes}</td>
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
    return <Payment {...props} history={useNavigate()}/>
};

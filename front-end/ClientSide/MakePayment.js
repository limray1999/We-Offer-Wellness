import React, {Component} from 'react';
import Navigation from "./Navigation";
import {ImCheckmark, ImCross} from "react-icons/im";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import PaymentService from "../Services/PaymentService";
import PatientService from "../Services/PatientService";
import InvoiceService from "../Services/InvoiceService";

class MakePayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            history: this.props.history,
            invoiceId: this.props.location.state.invoiceId,
            max: this.props.location.state.needToPay,
            amount: 0.0,
            isDebit: false,
            notes: null,
            accountNumber: "",
            bankName: "",
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if(this.state.amount <= 0.0) {
            alert("Payment amount must great than zero!");
            return;
        }
        if(this.state.accountNumber==="" || this.state.bankName==="") return;
        let newPatPayment = {
            paymentMethod: this.state.isDebit?"Debit":"Credit",
            accountNumber: this.state.accountNumber,
            amount: this.state.amount,
            bankName: this.state.bankName,
            notes: this.state.notes,
            patientId: this.state.user.id,
            invoiceId: this.state.invoiceId,
        };
        // console.log((this.state.max-this.state.amount).toFixed(2));
        // console.log(newPatPayment);
        // console.log(this.state.invoiceId);
        PaymentService.postPatPayment(newPatPayment).then((resp)=>{});
        InvoiceService.updateNeedToPay(this.state.invoiceId, {needToPay: (this.state.max-this.state.amount).toFixed(2)}).then((resp)=>{this.state.history("/payment")});
    }
    render() {
        // console.log(this.state.location.state.invoiceId);
        // console.log(typeof (this.state.max))
        // console.log(this.state);
        return (
            <div>
                {
                    this.state.user === null &&
                    <Navigate to="/signin"/>
                }
                {
                    this.state.user!==null &&
                    <div>
                        <Navigation user={this.state.user} setUser={this.props.user} />
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "100px"}}>
                            <h3 className="text-center">Pay the bill</h3>
                            <div className="card-body">
                                <form onSubmit={event=>event.preventDefault()}>
                                    <label>Select method: </label>
                                    <select
                                        className="form-select"
                                        required
                                        type="text"
                                        name="method"
                                        onChange={(event)=>{
                                            this.setState({isDebit: event.target.value==="Debit Card"?true:false});
                                        }}>
                                        <option>Credit Card</option>
                                        <option>Debit Card</option>
                                    </select><br/>
                                    <label>Bank Name: </label>
                                    <input className="form-control" required type="text" name="bankName" onChange={(event)=>{this.setState({bankName: event.target.value})}}/><br/>
                                    <label>Enter your account number: </label>
                                    <input className="form-control" required type="text" name="accountNumber" onChange={(event)=>{this.setState({accountNumber: event.target.value})}}/><br />
                                    {
                                        this.state.isDebit &&
                                        <div>
                                            <label>Pin: </label>
                                            <input className="form-control" required type="text" name="pin"></input>
                                        </div>
                                    }
                                    <label>Enter the amount: </label>
                                    <input
                                        className="form-control"
                                        required
                                        type="number"
                                        name="amount"
                                        min="0"
                                        max={this.state.max}
                                        step="0.01"
                                        value = {this.state.amount}
                                        onChange={(event)=>{
                                            this.setState({amount: parseFloat(event.target.value)>this.state.max?this.state.max:parseFloat(event.target.value)})
                                        }}
                                    /><br/>
                                    <label>Any note on this payment: </label>
                                    <input className="form-control" type="text" name="notes" onChange={(event)=>{this.setState({notes: event.target.value})}}/><br/>
                                    <div className="text-center">
                                        <button className="btn btn-primary" onClick={this.handleClick}>Pay</button>
                                        <button style={{marginLeft: "150px"}} className="btn btn-danger" onClick={()=>{this.state.history("/invoice")}}>Cancel</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default (props) => {
    return <MakePayment {...props} history={useNavigate()} location={useLocation()}/>
};

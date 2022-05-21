import axios from "axios";

const  baseURL = "http://localhost:8080/payment"

class PaymentService {
    getByPatientId(id) {
        return axios.get(baseURL+"/patient/id/"+id);
    }

    getPayments() {
        return axios.get(baseURL);
    }

    getByInvoiceId(id) {
        return axios.get(baseURL+"/invoice/id/"+id)
    }

    postPatPayment(payment) {
        return axios.post(baseURL+"/patpayment", payment);
    }
}

export default new PaymentService();

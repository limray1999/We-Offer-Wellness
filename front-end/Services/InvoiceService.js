import axios from "axios";

const baseURL = "http://localhost:8080/invoice"

class InvoiceService {
    getByPatientId(id) {
        return axios.get(baseURL+"/patient/id/"+id);
    }

    getInvoices() {
        return axios.get(baseURL);
    }

    getById(id) {
        return axios.get(baseURL+"/id/"+id);
    }

    getByTreatmentId(id) {
        return axios.get(baseURL+"/treatment/id/"+id);
    }

    updateNeedToPay(invoiceId, needToPay) {
        return axios.put(baseURL+"/needtopay/"+invoiceId, needToPay);
    }
}

export default new InvoiceService();

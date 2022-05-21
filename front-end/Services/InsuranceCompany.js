import axios from "axios";

const baseURL = "http://localhost:8080/insurancecompany"

class InsuranceCompany {
    getInsuranceCompanyList() {
        return axios.get(baseURL);
    }
    getById(id) {
        return axios.get(baseURL+"/"+id);
    }
}

export default new InsuranceCompany();

import axios from "axios";

const baseURL = "http://localhost:8080/account"

class AccountService {

    getByEmail(email) {
        return axios.get(baseURL+"/"+email);
    }

    getPasswordByEmail(email) {
        return axios.get(baseURL+"/password/"+email);
    }

    getByPatientId(id) {
        return axios.get(baseURL+"/patient/"+id);
    }

    saveNewAccount(newAccount) {
        return axios.post(baseURL, newAccount);
    }
}

export default new AccountService();

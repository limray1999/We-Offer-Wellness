import axios from "axios";

const baseURL = "http://localhost:8080/emergencycontact"

class ECService {
    getByPatientId(id) {
        return axios.get(baseURL+"/patient/"+id);
    }

    getByECId(id) {
        return axios.get(baseURL+"/"+id);
    }

    saveEC(ec) {
        return axios.post(baseURL, ec);
    }

    updateEC(ec) {
        return axios.put(baseURL, ec);
    }

    deleteByECId(id) {
        return axios.delete(baseURL+"/"+id);
    }

}

export default new ECService();

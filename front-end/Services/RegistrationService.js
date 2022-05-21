import axios from "axios";

const baseURL = "http://localhost:8080/registration"

class RegistrationService {

    getByPatientId(id) {
        return axios.get(baseURL+"/patient/"+id);
    }

    addByPatientId(id, icd) {
        return axios.post(baseURL+"/patient/"+id, icd);
    }

    getById(id) {
        return axios.get(baseURL+"/"+id);
    }

    deleteById(id) {
        return axios.delete(baseURL+"/"+id);
    }
}

export default new RegistrationService();

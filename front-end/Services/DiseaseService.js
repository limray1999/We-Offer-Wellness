import axios from "axios";

const baseURL = "http://localhost:8080/disease"

class DiseaseService {

    getDiseaseList() {
        return axios.get(baseURL);
    }

    getByICD(icd) {
        return axios.get(baseURL+"/"+icd);
    }

    saveDisease(disease) {
        return axios.post(baseURL, disease);
    }

    updateDisease(disease) {
        return axios.put(baseURL, disease);
    }

    deleteByICD(icd) {
        return axios.delete(baseURL+"/"+icd);
    }
}

export default new DiseaseService();

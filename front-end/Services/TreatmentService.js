import axios from "axios";


const baseURL = "http://localhost:8080/treatment"

class TreatmentService {
    getByRegistrationId(id) {
        return axios.get(baseURL+"/registration/"+id);
    }

    getById(id) {
        return axios.get(baseURL+"/"+id);
    }

    saveDrug(treatment) {
        return axios.post(baseURL+"/drug", treatment);
    }

    saveLab(treatment) {
        return axios.post(baseURL+"/lab", treatment);
    }

    saveSurgery(treatment) {
        return axios.post(baseURL+"/surgery", treatment);
    }

    updateDrug(treatment) {
        return axios.put(baseURL+"/drug", treatment);
    }

    updateLab(treatment) {
        return axios.put(baseURL+"/lab", treatment);
    }

    updateSurgery(treatment) {
        return axios.put(baseURL+"/surgery", treatment);
    }

    deleteById(id) {
        return axios.delete(baseURL+"/"+id);
    }
}

export default new TreatmentService();

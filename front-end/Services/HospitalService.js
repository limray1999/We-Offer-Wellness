import axios from "axios";

const baseURL = "http://localhost:8080/hospital";

class HospitalService {

    numberOfHospital() {
        return axios.get(baseURL+"/count");
    }

    getHospitals() {
        return axios.get(baseURL);
    }

    getHospitalById(id) {
        return axios.get(baseURL+"/"+id);
    }

    deleteById(id) {
        return axios.delete(baseURL+"/"+id);
    }

    saveHospital(hospital) {
        return axios.post(baseURL, hospital);
    }

    updateHospital(hospital) {
        return axios.put(baseURL, hospital);
    }

    getHospitalByState(state) {
        return axios.get(baseURL+"/state/"+state);
    }

    getHospitalByZipcode(zipcode) {
        return axios.get(baseURL+"/zipcode/"+zipcode);
    }

    getHospitalByName(name) {
        return axios.get(baseURL+"/name/"+name);
    }
}

export default new HospitalService();

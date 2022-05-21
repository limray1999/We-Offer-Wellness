import axios from "axios";

const baseURL = "http://localhost:8080/patient"

class PatientService {

    numberOfPatient() {
        return axios.get(baseURL+"/count");
    }

    getPatientList() {
        return axios.get(baseURL);
    }

    existsById(id) {
        return axios.get(baseURL+"/exists/"+id);
    }

    getById(id) {
        return axios.get(baseURL+"/"+id);
    }

    saveOut(patient) {
        return axios.post(baseURL+"/out", patient);
    }

    saveIn(patient) {
        return axios.post(baseURL+"/in", patient);
    }

    updateOut(patient) {
        return axios.put(baseURL+"/out", patient);
    }

    updateIn(patient) {
        return axios.put(baseURL+"/in", patient);
    }

    deleteOutById(id) {
        return axios.delete(baseURL+"/out/"+id);
    }

    deleteInById(id) {
        return axios.delete(baseURL+"/in/"+id);
    }

    deletePatientById(id) {
        return axios.delete(baseURL+"/"+id);
    }

    getPatientByFirstName(name) {
        return axios.get(baseURL+"/firstname/"+name);
    }

    getPatientByHospitalId(id) {
        return axios.get(baseURL+"/hospital/"+id);
    }

    getPatientByLastName(name) {
        return axios.get(baseURL+"/lastname/"+name);
    }
}

export default new PatientService();

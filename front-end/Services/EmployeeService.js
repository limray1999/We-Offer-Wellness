import axios from "axios";

const baseURL = "http://localhost:8080/employee"

class EmployeeService {

    numberOfDoctor() {
        return axios.get(baseURL+"/doctor/count")
    }

    getDoctorById(id) {
        return axios.get(baseURL+"/"+id);
    }

    getDoctorByFirstName(firstName) {
        return axios.get(baseURL+"/doctor/firstname/"+firstName);
    }

    getDoctorByLastName(lastName) {
        return axios.get(baseURL+"/doctor/lastname/"+lastName);
    }

    getDoctorByHospitalId(id) {
        return axios.get(baseURL+"/doctor/hospital/"+id);
    }

    getDoctorByPatientId(id) {
        return axios.get(baseURL+"/doctor/patient/"+id)
    }

    getDoctorList() {
        return axios.get(baseURL+"/doctor");
    }

    saveCDoctor(doctor) {
        return axios.post(baseURL+"/consulting", doctor);
    }

    updateCDoctor(doctor) {
        return axios.put(baseURL+"/consulting", doctor);
    }

    saveFDoctor(doctor) {
        return axios.post(baseURL+"/fulltime", doctor);
    }

    updateFDoctor(doctor) {
        return axios.put(baseURL+"/fulltime", doctor);
    }

    deleteEmployeeById(id) {
        return axios.delete(baseURL+"/"+id);
    }

}

export default new EmployeeService();

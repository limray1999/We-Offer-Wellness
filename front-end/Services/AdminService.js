import axios from "axios";

const baseURL = "http://localhost:8080/admin"

class AdminService {
    getPasswordByUsername(username) {
        return axios.get(baseURL+"/"+username);
    }
}

export default new AdminService();

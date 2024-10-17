import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export default axios;

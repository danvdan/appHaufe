import axios from "axios";

const instance = axios.create({
  //TODO add url for backend
  baseURL: "http://0.0.0.0:3000/"
});

export default instance;

import axios from "axios";

// base url to make requests to the blockchain api
const instance = axios.create({
  baseURL: "https://blockchain.info/rawaddr/",
});

export default instance;

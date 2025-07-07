import axios from "axios";

export const sendTestData = async (data) => {
  return axios.post("http://localhost:3001/api/test", data);
};

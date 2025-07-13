import axios from "axios";

export const sendTestData = async (data) => {
  return axios.post("/api/test", data);
};

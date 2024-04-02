import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000",
});

const api = {
  async fetchData(filters) {
    try {
      return client.post("/abendData", filters);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};

export default api;

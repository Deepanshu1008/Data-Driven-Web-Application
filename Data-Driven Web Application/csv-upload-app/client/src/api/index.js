import axios from "axios";

export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("csvFile", file);

  return axios.post("/api/data/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const fetchData = (page = 1, limit = 20) => {
  return axios.get(`/api/data?page=${page}&limit=${limit}`);
};

export const calculateSubscriptionPrice = (data) => {
  return axios.post("/api/data/calculate", data);
};

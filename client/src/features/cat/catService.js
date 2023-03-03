import axios from "axios";

const API_URL = "/api/cats/";

const getCats = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const addCat = async (catData) => {
  const response = await axios.post(API_URL, catData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

const updateCat = async (catData) => {
  const response = await axios.put(API_URL + catData.get("id"), catData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

const deleteCat = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data;
};

const uploadImg = async (img) => {
  const response = await axios.post("/api/img/", img, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

const catServices = {
  getCats,
  addCat,
  updateCat,
  deleteCat,
  uploadImg,
};

export default catServices;

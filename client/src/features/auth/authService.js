import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  return response.data;
};

const logout = async () => {
  const response = await axios.get(API_URL + "logout");

  return response.data;
};

const getData = async () => {
  const response = await axios.get(API_URL + "me");

  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data;
};

const updateUser = async (formData) => {
  const response = await axios.put(API_URL + formData.get("id"), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getData,
  getAllUsers,
  deleteUser,
  updateUser,
};

export default authService;

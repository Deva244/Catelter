import axios from "axios";

const API_URL = "/api/contact/form/";

const submitForm = async (formData) => {
  const response = await axios.post(API_URL, formData);

  return response.data;
};

const getAllForms = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const updateForm = async (change) => {
  const response = await axios.put(API_URL + change.id, change);

  return response.data;
};

const deleteForm = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data;
};

const getUnviewedCount = async () => {
  const response = await axios.get(API_URL + "unviewed");

  return response.data;
};

const getHandledCount = async () => {
  const response = await axios.get(API_URL + "handled");

  return response.data;
};

const formServices = {
  submitForm,
  getAllForms,
  updateForm,
  deleteForm,
  getUnviewedCount,
  getHandledCount,
};

export default formServices;

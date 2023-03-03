import axios from "axios";

const API_URL = "/api/contact/message/";

const sendMsg = async (message) => {
  const response = await axios.post(API_URL, message);

  return response.data;
};

const getAllMessages = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const updateMessage = async (change) => {
  const response = await axios.put(API_URL + change.id, change);

  return response.data;
};

const deleteMessage = async (id) => {
  const response = await axios.delete(API_URL + id);

  return response.data;
};

const getUnreadCount = async () => {
  const response = await axios.get(API_URL + "unread");

  return response.data;
};

const getHandledCount = async () => {
  const response = await axios.get(API_URL + "handled");

  return response.data;
};

const messageServices = {
  sendMsg,
  getAllMessages,
  updateMessage,
  deleteMessage,
  getUnreadCount,
  getHandledCount,
};

export default messageServices;

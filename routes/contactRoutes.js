const express = require("express");
const {
  sendMessage,
  getAllMessages,
  messageState,
  deleteMessage,
  getUnreadCount,
  submitForm,
  getAllForms,
  formState,
  deleteForm,
  getUnviewedCount,
  getHandledMessage,
  getHandledForm,
} = require("../controllers/contactController");

const router = express.Router();

router.route("/message").get(getAllMessages).post(sendMessage);
router.route("/message/:id").put(messageState).delete(deleteMessage);
router.route("/message/unread").get(getUnreadCount);
router.route("/message/handled").get(getHandledMessage);

router.route("/form").post(submitForm).get(getAllForms);
router.route("/form/:id").put(formState).delete(deleteForm);
router.route("/form/unviewed").get(getUnviewedCount);
router.route("/form/handled").get(getHandledForm);

module.exports = router;

const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const Form = require("../models/form");

// Send Message
// POST
const sendMessage = asyncHandler(async (req, res) => {
  try {
    await Message.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      read: false,
      handled: false,
    });

    res
      .status(200)
      .json("Message sent, we will get back to you as soon as we can.");
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Messages
// GET
const getAllMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find();

    for (const message of messages) {
      message.recievedAt = message.createdAt.toString().slice(0, 24);
    }

    res.status(200).json(messages);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Unread Messages Count
// GET
const getUnreadCount = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find();
    let unreadCount = 0;

    for (const message of messages) {
      if (!message.read) {
        unreadCount += 1;
      }
    }

    res.status(200).json(unreadCount);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Handled Messages Count
// GET
const getHandledMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find();

    let handledCount = 0;

    for (const message of messages) {
      if (message.handled) {
        handledCount += 1;
      }
    }

    res.status(200).json(handledCount);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Message
// PUT
const messageState = asyncHandler(async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    const { type } = req.body;

    const change =
      type === "read"
        ? {
            read: !message.read,
          }
        : {
            handled: !message.handled,
          };

    await Message.findByIdAndUpdate(req.params.id, change);

    const newMessages = await Message.find();

    for (const message of newMessages) {
      message.recievedAt = message.createdAt.toString().slice(0, 24);
    }

    res.status(200).json(newMessages);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Message
// DELETE
const deleteMessage = asyncHandler(async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json("Successfully deleted the message");
  } catch (error) {
    throw new Error(error);
  }
});

// Submit Form
// POST
const submitForm = asyncHandler(async (req, res) => {
  try {
    await Form.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      contact: req.body.contact,
      petOwner: req.body.petOwner,
      pets: req.body.pets,
      character: req.body.character,
      living: req.body.living,
      children: req.body.children,
      selectedCat: req.body.selectedCat,
      viewed: false,
      handled: false,
    });

    res.status(200).json("Form submitted successfully");
  } catch (error) {
    throw new Error(error);
  }
});

// Get Forms
// GET
const getAllForms = asyncHandler(async (req, res) => {
  try {
    const forms = await Form.find();

    for (const form of forms) {
      form.recievedAt = form.createdAt.toString().slice(0, 24);
    }

    res.status(200).json(forms);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Unviewed Forms Count
// GET
const getUnviewedCount = asyncHandler(async (req, res) => {
  try {
    const forms = await Form.find();
    let unviewedCount = 0;

    for (const form of forms) {
      if (!form.viewed) {
        unviewedCount += 1;
      }
    }

    res.status(200).json(unviewedCount);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Handled Forms Count
// GET
const getHandledForm = asyncHandler(async (req, res) => {
  try {
    let handledCount = 0;

    const forms = await Form.find();

    for (const form of forms) {
      if (form.handled) {
        handledCount += 1;
      }
    }

    res.status(200).json(handledCount);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Form
// PUT
const formState = asyncHandler(async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    const { type } = req.body;

    const change =
      type === "view"
        ? {
            viewed: !form.viewed,
          }
        : {
            handled: !form.handled,
          };

    await Form.findByIdAndUpdate(req.params.id, change);

    const newForms = await Form.find();

    for (const form of newForms) {
      form.recievedAt = form.createdAt.toString().slice(0, 24);
    }

    res.status(200).json(newForms);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Form
// DELETE
const deleteForm = asyncHandler(async (req, res) => {
  try {
    await Form.findByIdAndDelete(req.params.id);

    res.status(200).json("Successfully deleted the form");
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  sendMessage,
  getAllMessages,
  messageState,
  deleteMessage,
  getUnreadCount,
  getHandledMessage,
  submitForm,
  getAllForms,
  getUnviewedCount,
  getHandledForm,
  formState,
  deleteForm,
};

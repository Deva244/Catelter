import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import messageServices from "./messageService";

const initialState = {
  data: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  unreadCount: "",
  handledMessages: "",
};

export const sendMessage = createAsyncThunk(
  "message/send",
  async (data, thunkAPI) => {
    try {
      return await messageServices.sendMsg(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "message/all",
  async (thunkAPI) => {
    try {
      return await messageServices.getAllMessages();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUnreadCount = createAsyncThunk(
  "message/unread",
  async (thunkAPI) => {
    try {
      return await messageServices.getUnreadCount();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getHandledMsgs = createAsyncThunk(
  "message/unhandled",
  async (thunkAPI) => {
    try {
      return await messageServices.getHandledCount();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMessage = createAsyncThunk(
  "message/read",
  async (change, thunkAPI) => {
    try {
      return await messageServices.updateMessage(change);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "message/delete",
  async (id, thunkAPI) => {
    try {
      return await messageServices.deleteMessage(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })
      .addCase(getUnreadCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getHandledMsgs.fulfilled, (state, action) => {
        state.handledMessages = action.payload;
      })
      .addCase(getHandledMsgs.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default messageSlice.reducer;
export const { reset } = messageSlice.actions;

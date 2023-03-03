import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formServices from "./formService";

const initialState = {
  forms: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  unviewedCount: "",
  handledForms: "",
};

export const submitForm = createAsyncThunk(
  "form/submit",
  async (FormData, thunkAPI) => {
    try {
      return await formServices.submitForm(FormData);
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

export const getAllForms = createAsyncThunk("form/all", async (thunkAPI) => {
  try {
    return await formServices.getAllForms();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUnviewedCount = createAsyncThunk(
  "form/unread",
  async (thunkAPI) => {
    try {
      return await formServices.getUnviewedCount();
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

export const getHandledForms = createAsyncThunk(
  "form/unhandled",
  async (thunkAPI) => {
    try {
      return await formServices.getHandledCount();
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

export const updateForm = createAsyncThunk(
  "form/read",
  async (change, thunkAPI) => {
    try {
      return await formServices.updateForm(change);
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

export const deleteForm = createAsyncThunk(
  "form/delete",
  async (id, thunkAPI) => {
    try {
      return await formServices.deleteForm(id);
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

const formSlice = createSlice({
  name: "form",
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
      .addCase(submitForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllForms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forms = action.payload;
      })
      .addCase(getAllForms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUnviewedCount.fulfilled, (state, action) => {
        state.unviewedCount = action.payload;
      })
      .addCase(getUnviewedCount.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getHandledForms.fulfilled, (state, action) => {
        state.handledForms = action.payload;
      })
      .addCase(getHandledForms.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forms = action.payload;
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default formSlice.reducer;
export const { reset } = formSlice.actions;

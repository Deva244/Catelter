import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import catServices from "./catService";

const initialState = {
  cats: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getCats = createAsyncThunk("cat/cats", async (thunkAPI) => {
  try {
    return await catServices.getCats();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addCat = createAsyncThunk("cat/addCat", async (cat, thunkAPI) => {
  try {
    return await catServices.addCat(cat);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCat = createAsyncThunk(
  "cat/updateCat",
  async (cat, thunkAPI) => {
    try {
      return await catServices.updateCat(cat);
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

export const deleteCat = createAsyncThunk(
  "cat/deleteCat",
  async (id, thunkAPI) => {
    try {
      return await catServices.deleteCat(id);
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

export const uploadImg = createAsyncThunk(
  "/img/upload",
  async (img, thunkAPI) => {
    try {
      return await catServices.uploadImg(img);
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

const catSlice = createSlice({
  name: "cat",
  initialState,
  reducers: {
    resetCat: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cats = action.payload;
      })
      .addCase(getCats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(addCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCat.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default catSlice.reducer;
export const { resetCat } = catSlice.actions;

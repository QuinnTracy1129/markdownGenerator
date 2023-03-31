import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { find } from "../../services";

const initialState = {
    catalogs: [],
    user: {},
    isLoading: false,
  },
  entity = "attendances";

export const FIND = createAsyncThunk(
  `${entity}/find`,
  async (item, thunkAPI) => {
    try {
      return await find(entity, item.id, item.token);
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

export const entitySlice = createSlice({
  name: entity,
  initialState,
  reducers: {
    RESET: state => initialState,
  },
  extraReducers: builder => {
    builder
      // FIND
      .addCase(FIND.pending, state => {
        state.isLoading = true;
      })
      .addCase(FIND.fulfilled, (state, action) => {
        state.isLoading = false;
        state.catalogs = action.payload.attendances;
        state.user = action.payload.user;
      })
      .addCase(FIND.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { RESET } = entitySlice.actions;
export default entitySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchData from "../../fetchData";

export const loadFetchedData = createAsyncThunk(
  "fetchedData/loadFetchedData",
  async () => {
    const fetchedData = await fetchData();
    return fetchedData;
  }
);

const fetchedDataSlice = createSlice({
  name: "fetchedData",
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
    },
    updateExpense: (state, action) => {
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeExpense: (state, action) => {
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadFetchedData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addExpense, updateExpense, removeExpense } =
  fetchedDataSlice.actions;

export default fetchedDataSlice.reducer;

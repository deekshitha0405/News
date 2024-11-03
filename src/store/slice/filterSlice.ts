// src/store/reducer/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
  data: {
    sources: [1],
    q: "current",
  },
};

const filterSlice = createSlice({
  name: "filterData",
  initialState,
  reducers: {
    updateFilterData: (state, action: PayloadAction<Partial<any>>) => {
      state.data = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateFilterData } = filterSlice.actions;
export const selectFilterData=(state:RootState)=>state.filter

export default filterSlice.reducer;

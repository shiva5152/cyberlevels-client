import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup";

// Define a type for the slice state
export interface IFilterState {
  location: string[];
  jobType: string[];
  jobCategory: string[];
  workMode: string[];
  salary: number;
  preferredExperience: string[];
  status: string

}

// Define the initial state using that type
const initialState: IFilterState = {
  location: [],
  jobType: [],
  jobCategory: [],
  workMode: [],
  salary: -1,
  preferredExperience: [],
  status: "active"
};

export const filterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      if (state.location.includes(action.payload)) {
        state.location = state.location.filter(ele => ele !== action.payload);
      } else {
        state.location.push(action.payload);
      }
    },
    setJobType: (state, action: PayloadAction<string>) => {
      if (state.jobType.includes(action.payload)) {
        state.jobType = state.jobType.filter(ele => ele !== action.payload);
      } else {
        state.jobType.push(action.payload);
      }
    },
    setJobCategory: (state, action: PayloadAction<string>) => {
      if (state.jobCategory.includes(action.payload)) {
        state.jobCategory = state.jobCategory.filter(ele => ele !== action.payload);
      } else {
        state.jobCategory.push(action.payload);
      }
    },

    setWorkMode: (state, action: PayloadAction<string>) => {
      if (state.workMode.includes(action.payload)) {
        state.workMode = state.workMode.filter(ele => ele !== action.payload);
      } else {
        state.workMode.push(action.payload);
      }
    },
    setPreferredExperience: (state, action: PayloadAction<string>) => {
      if (state.preferredExperience.includes(action.payload)) {
        state.preferredExperience = state.preferredExperience.filter((e) => e !== action.payload);
      } else {
        state.preferredExperience.push(action.payload);
      }
    },
    setSalary: (state, action: PayloadAction<number>) => {
      if (state.salary !== action.payload) {
        state.salary = action.payload
      }
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload
    },


    resetFilter: (state) => {
      state.location = [],
        state.jobType = [],
        state.jobCategory = [],
        state.workMode = [],
        state.salary = -1,
        state.preferredExperience = []
    },
  },
});

export const {
  setJobCategory,
  setLocation,
  setJobType,
  setPreferredExperience,
  setSalary,
  setWorkMode,
  resetFilter,
  setStatus
} = filterSlice.actions;

export default filterSlice.reducer;

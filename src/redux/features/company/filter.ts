import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface ICompanyFilterState {
    name: string,
    teamSize: string[]
}

// Define the initial state using that type
const initialState: ICompanyFilterState = {
    name: "",
    teamSize: []
};

export const companyFilterSlice = createSlice({
    name: "companyFilter",
    initialState,
    reducers: {
        setTeamSize: (state, action: PayloadAction<string>) => {
            if (state.teamSize.includes(action.payload)) {
                state.teamSize = state.teamSize.filter(ele => ele !== action.payload);
            } else {
                state.teamSize.push(action.payload);
            }
        },

        setName: (state, action: PayloadAction<string>) => {
            if (state.name !== action.payload) {
                state.name = action.payload
            }
        },

        resetFilter: (state) => {
            state.name = "",
                state.teamSize = []
        },
    },
});

export const {
    setTeamSize,
    setName,
    resetFilter
} = companyFilterSlice.actions;

export default companyFilterSlice.reducer;

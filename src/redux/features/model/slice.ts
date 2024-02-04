import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModelState {
    profileCompleteModel: boolean;
    subscriptionModel: boolean;
}

const initialState: ModelState = {
    profileCompleteModel: false,
    subscriptionModel: false
};

const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {
        setProfileCompleteModel: (state, action: PayloadAction<boolean>) => {
            state.profileCompleteModel = action.payload;
        },
        setSubscriptionModel: (state, action: PayloadAction<boolean>) => {
            state.subscriptionModel = action.payload;
        },
    },
});

export const { setProfileCompleteModel,
    setSubscriptionModel } = modelSlice.actions;
export default modelSlice.reducer;

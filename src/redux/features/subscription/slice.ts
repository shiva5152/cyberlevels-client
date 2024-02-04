import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidateSub, IEmployerSub } from '@/types/template';

export interface templateState {
    submitCandidateSub: IEmployerSub | null,
    submitEmploySub: IEmployerSub | null,
    employSub: IEmployerSub[],
    candidateSub: IEmployerSub[],
    error: string | null,
    loading: boolean,
}

const initialState: templateState = {
    submitCandidateSub: null,
    submitEmploySub: null,
    employSub: [],
    candidateSub: [],
    error: null,
    loading: false,
}

export const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {

        requestStart: (state) => {
            state.loading = true;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        requestSuccess: (state) => {
            state.loading = false;
        },
        getEmploySubSuccess: (state, action: PayloadAction<IEmployerSub[]>) => {
            state.employSub = action.payload;
            state.loading = false;
            state.error = null;
        },
        getCandidateSubSuccess: (state, action: PayloadAction<IEmployerSub[]>) => {
            state.candidateSub = action.payload;
            state.loading = false;
            state.error = null;
        },
        submitCandidateSubSuccess: (state, action: PayloadAction<IEmployerSub>) => {
            if (state.candidateSub)
                state.candidateSub.push(action.payload)
            state.loading = false;
            state.error = null;
        },
        submitEmploySubSuccess: (state, action: PayloadAction<IEmployerSub>) => {
            if (state.employSub)
                state.employSub.push(action.payload)
            state.loading = false;
            state.error = null;
        },

    },
})

export const {
    requestFail,
    requestStart,
    requestSuccess,
    getCandidateSubSuccess,
    getEmploySubSuccess,
    submitCandidateSubSuccess,
    submitEmploySubSuccess

} = subscriptionSlice.actions

export default subscriptionSlice.reducer;

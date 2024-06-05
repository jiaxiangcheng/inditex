import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
export interface SecurityState {
    dataIsLoading: boolean;
}

const initialState: SecurityState = {
    dataIsLoading: true,
};

export const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        setDataIsLoading: (
            state,
            action: PayloadAction<any>
        ) => {
            state.dataIsLoading = action.payload;
        },
    },
});
export const { setDataIsLoading } = utilsSlice.actions;

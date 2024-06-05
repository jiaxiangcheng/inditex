import { createSlice } from '@reduxjs/toolkit';

const podcastsSlice = createSlice({
    name: 'podcasts',
    initialState: {},
    reducers: {},
});

export default podcastsSlice.reducer;
export const { actions } = podcastsSlice;
export const { reducer } = podcastsSlice;
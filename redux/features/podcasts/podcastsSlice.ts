import {
    createEntityAdapter,
    createSelector,
    createSlice,
} from "@reduxjs/toolkit";

const userReportsAdapter = createEntityAdapter({
    selectId: (userReport: any) => userReport.id,
});

const initialState = userReportsAdapter.getInitialState({});

export const userReportsSlice = createSlice({
    name: "userReports",
    initialState,
    reducers: {
        userReportsAdded: userReportsAdapter.addMany,
        userReportAdded: userReportsAdapter.addOne,
        userReportRemoved: userReportsAdapter.removeOne,
        userReportUpdated: userReportsAdapter.updateOne,
        userReportUpdatedMany:
            userReportsAdapter.updateMany,
        userReportsReceived: userReportsAdapter.setAll,
        userReportRemovedAll: userReportsAdapter.removeAll,
    },
    extraReducers: (builder) => {
        builder.addCase("logout", () => {
            return initialState;
        });
    },
});

export const {
    userReportsAdded,
    userReportAdded,
    userReportRemoved,
    userReportUpdated,
    userReportUpdatedMany,
    userReportsReceived,
    userReportRemovedAll,
} = userReportsSlice.actions;

export const userReportsSelector =
    userReportsAdapter.getSelectors(
        (state: any) => state.userReports
    );

const allUserReportsSelector = (state: any) =>
    Object.keys(state.userReports.entities).map(
        (key) => state.userReports.entities[key]
    );

export const selectAllUserReports = () =>
    createSelector(
        allUserReportsSelector,
        (allUserReports) => allUserReports
    );

export const selectUserReportByUsername = (
    username: string
) =>
    createSelector(
        userReportsSelector.selectAll,
        (userReports) =>
            userReports.find((userReport: any) => {
                return (
                    userReport.scrapedData.username ===
                    username
                );
            })
    );

export const selectAllUserReportsByCreatedAt = () =>
    createSelector(
        allUserReportsSelector,
        (allUserReports) =>
            allUserReports.sort((a: any, b: any) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            })
    );

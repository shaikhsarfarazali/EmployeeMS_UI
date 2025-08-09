import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.model";

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectUsers = createSelector(
    selectUserState,
    (state) => state.users // Selector for the users array
);

export const selectUsersLoading = createSelector(
    selectUserState,
    state => !state.loaded && !state.error // Selector for the loading state
);

export const selectUsersLoaded = createSelector(
    selectUserState,
    state => state.loaded // Selector for the "loaded" flag for users
);
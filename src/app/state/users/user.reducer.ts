import { createReducer, on } from "@ngrx/store";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "./user.action";
import { initialUserState } from "./user.model";

export const userReducer = createReducer(
    initialUserState,
    on(loadUsers, (state) => ({ ...state, loaded: false })),
    on(loadUsersSuccess, (state, { users }) => ({
        ...state, users, error: null, loaded: true // Set loaded to true when users are successfully loaded
    })),
    on(loadUsersFailure, (state, { error }) => ({
        ...state, error, loaded: false
    })),
)
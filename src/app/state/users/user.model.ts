export interface UserState {
    users: any[]; // Replace `any` with your user model
    loaded: boolean; // Indicates if data is already loaded
    error?: string | null; // Optional error message
}

export const initialUserState: UserState = {
    users: [],
    loaded: false,
    error: null
};
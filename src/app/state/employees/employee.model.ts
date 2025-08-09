import { Employee } from "../../interfaces/employee.model";

export interface EmployeeState {
    employees: Employee[];
    error: string | null;
    loading: boolean;
    loaded?: boolean; // Optional property to track if employees are loaded
    users?: any[]; // Optional property to hold users data
}

export const initialState: EmployeeState = {
    employees: [],
    error: null,
    loading: false,
    loaded: false, // Initialize loaded to false
    users: [] // Initialize users as an empty array
};
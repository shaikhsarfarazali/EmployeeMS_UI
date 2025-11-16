import { createReducer, on } from "@ngrx/store";
import { addEmployee, addEmployeeFailure, addEmployeeSuccess, deleteEmployee, deleteEmployeeFailure, deleteEmployeeSuccess, loadEmployees, loadEmployeesFailure, loadEmployeesSuccess, navigateAfterSuccess, updateEmployee, updateEmployeeFailure, updateEmployeeSuccess } from "./employee.action";
import { initialState } from "./employee.model";

export const employeeReducer = createReducer(
    initialState,
    on(addEmployee, (state, { employee }) => ({
        ...state, loading: true
    })),
    on(addEmployeeSuccess, (state, { employee }) => ({
        ...state, employees: [...state.employees, { ...employee }], error: null, loading: false
    })),
    on(addEmployeeFailure, (state, { error }) => ({
        ...state, error, loading: false
    })),

    on(updateEmployee, (state, { employee }) => ({
        ...state, loading: true
    })),
    on(updateEmployeeSuccess, (state, { employee }) => ({
        ...state, employees: [...state.employees, { ...employee }], error: null, loading: false, loaded: false
    })),
    on(updateEmployeeFailure, (state, { error }) => ({
        ...state, error, loading: false
    })),

    on(navigateAfterSuccess, (state) => ({
        ...state, employees: [...state.employees], error: null, loading: false
    })),
    on(loadEmployees, (state) => ({ ...state, loading: true })),
    on(loadEmployeesSuccess, (state, { employees }) => ({
        ...state, employees, error: null, loading: false, loaded: true // Set loaded to true when employees are successfully loaded
    })),
    on(loadEmployeesFailure, (state, { error }) => ({
        ...state, error, loading: false
    })),

    on(deleteEmployee, (state, { id }) => ({ ...state, loading: true })),
    on(deleteEmployeeSuccess, (state, { id }) => ({
        ...state,
        employees: state.employees.filter(emp => emp.id !== id),
        loading: false,
        error: null
    })),
    on(deleteEmployeeFailure, (state, { error }) => ({
        ...state, error, loading: false
    })),
)
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeState } from "./employee.model";

// 'employees' should be same as the key in the store mention in app.config.ts
export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

export const selectEmployees = createSelector(
    selectEmployeeState,
    state => state.employees
);

export const selectEmployeesLoading = createSelector(
    selectEmployeeState,
    state => state.loading
)
export const selectEmployeesLoaded = createSelector(
    selectEmployeeState,
    state => state.loaded // Selector for the "loaded" flag
);

export const selectEmployeesError = createSelector(
    selectEmployeeState,
    state => state.error
)
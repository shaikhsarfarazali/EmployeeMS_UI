import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from "../../services/employee/employee.service";
import { addEmployee, addEmployeeFailure, addEmployeeSuccess, deleteEmployee, deleteEmployeeFailure, deleteEmployeeSuccess, loadEmployees, loadEmployeesFailure, loadEmployeesSuccess, navigateAfterSuccess, updateEmployee, updateEmployeeFailure, updateEmployeeSuccess } from './employee.action';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeEffects {
    // right place to trigger action
    action$ = inject(Actions);
    router = inject(Router);

    constructor(
        // this action$ will not work, bcoz Actions trigger before constructor
        // private action$: Actions, 
        private _employeeService: EmployeeService) { }

    addEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(addEmployee),
            switchMap(({ employee }) =>
                this._employeeService.createEmployee(employee).pipe(
                    map(() => addEmployeeSuccess({ employee })),
                    catchError((error) => of(addEmployeeFailure({ error })))
                )
            )
        )
    );

    updateEmployee$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateEmployee),
            switchMap(({ employee }) =>
                this._employeeService.updateEmployee(employee).pipe(
                    map(() => updateEmployeeSuccess({ employee })),
                    catchError((error) => of(updateEmployeeFailure({ error })))
                )
            )
        )
    );

    navigateAfterSuccess$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(addEmployeeSuccess, updateEmployeeSuccess), // Triggered automatically when addEmployeeSuccess is dispatched
                tap(() => this.router.navigate(['/employees']))
            ),
        { dispatch: false }
    );

    loadEmployees$ = createEffect(() =>
        this.action$.pipe(
            // action of type is loadEmployees
            ofType(loadEmployees),
            // normally we use it to trigger service which holds api call
            mergeMap(() =>
                this._employeeService.getAllEmployees().pipe(
                    map((employees) => loadEmployeesSuccess({ employees })),
                    catchError((error) => of(loadEmployeesFailure({ error })))
                )
            )
        )
    );

    deleteEmployees$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteEmployee),
            mergeMap(({ id }) =>
                this._employeeService.deleteEmployee(id).pipe(
                    map(() => deleteEmployeeSuccess({ id })),
                    catchError((error) => of(deleteEmployeeFailure({ error })))
                )
            )
        )
    );

    deleteEmployeeSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteEmployeeSuccess),
            map(() => loadEmployees())
        )
    );
}
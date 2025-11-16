import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "./user.action";
import { inject, Injectable } from "@angular/core";
import { EmployeeService } from "../../services/employee/employee.service";


@Injectable()
export class UserEffects {
    // right place to trigger action
    action$ = inject(Actions);

    constructor(private _employeeService: EmployeeService) { }

    loadUsers$ = createEffect(() =>
        this.action$.pipe(
            ofType(loadUsers),
            mergeMap(() =>
                this._employeeService.getAllUsers().pipe(
                    map((users) => loadUsersSuccess({ users })),
                    catchError((error) => of(loadUsersFailure({ error })))
                )
            )
        )
    );
}
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import { sharedImports } from '../../common/shared-imports';
import { Store } from '@ngrx/store';
import { selectEmployees } from '../../state/employees/employee.selector';
import { addEmployee, updateEmployee } from '../../state/employees/employee.action';
import { Employee } from '../../interfaces/employee.model';
import { take } from 'rxjs';
import { selectUsers, selectUsersLoaded, selectUsersLoading } from '../../state/users/user.selector';
import { loadUsers } from '../../state/users/user.action';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  imports: [sharedImports, AsyncPipe],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
  standalone: true
})

export class EmployeeFormComponent implements OnInit {

  private store = inject(Store);
  employee$ = this.store.select(selectEmployees);
  loading$ = this.store.select(selectUsersLoading);
  loaded$ = this.store.select(selectUsersLoaded);

  users$ = this.store.select(selectUsers);

  form: FormGroup;
  isEditMode = false;
  employeeId: number = 0;
  isLoading: boolean = true;

  get userId() {
    return this.form.get('userId');
  }

  get department() {
    return this.form.get('department');
  }

  get salary() {
    return this.form.get('salary');
  }

  get dateOfJoining() {
    return this.form.get('dateOfJoining');
  }

  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.form = this.fb.group({
      userId: ['', Validators.required],
      department: ['', [Validators.required, Validators.minLength(3)]],
      salary: [0, [Validators.required, Validators.minLength(1)]],
      dateOfJoining: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadUsers() {
    this.loaded$.pipe(take(1)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(loadUsers());
      }
      this.isLoading = false;
    });
  }

  loadEmployee(id: number) {
    this._employeeService.getEmployeeById(id).subscribe({
      next: (emp) => {

        emp.dateOfJoining = new Date(emp.dateOfJoining).toISOString().split('T')[0];
        this.userId?.disable();
        this.form.patchValue(emp)
      },
      error: (err) => console.error('Error loading employee', err)
    });
  }

  submitForm() {
    if (this.form.invalid) return;
    let employee: Employee;
    if (this.isEditMode) {
      employee = { ...this.form.value, id: this.employeeId }
      this.updateEmployee(employee);
    } else {
      employee = this.form.value;
      this.addEmployee(employee);
    }
  }

  addEmployee(employee: Employee) {
    this.store.dispatch(addEmployee({ employee }));
  }

  updateEmployee(employee: Employee) {
    this.store.dispatch(updateEmployee({ employee }));
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
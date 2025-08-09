import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router } from '@angular/router';
import { sharedImports } from '../../common/shared-imports';
import { AuthService } from '../../services/core/auth.service';
import { Store } from '@ngrx/store';
import { deleteEmployee, loadEmployees } from '../../state/employees/employee.action';
import { selectEmployees, selectEmployeesLoaded, selectEmployeesLoading } from '../../state/employees/employee.selector';
import { AsyncPipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, take, takeUntil } from 'rxjs';
import { Employee } from '../../interfaces/employee.model';

@Component({
  selector: 'app-employee-list',
  imports: [sharedImports, AsyncPipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  standalone: true,
})
export class EmployeeListComponent implements OnInit {

  private store = inject(Store);
  employee$ = this.store.select(selectEmployees);
  loading$ = this.store.select(selectEmployeesLoading);
  loaded$ = this.store.select(selectEmployeesLoaded);
  filteredEmployees$: Observable<Employee[]>;

  isAdmin: boolean = false;

  searchTerm = '';
  sortField = 'fullName';
  sortAsc = true;

  pageSize = 5;
  totalPages = 1;
  currentPage = 1;

  private destroy$ = new Subject<void>();
  private searchTerm$ = new Subject<string>();

  constructor(private _employeeService: EmployeeService, private _authService: AuthService, private router: Router) {
    this.filteredEmployees$ = this.employee$;
  }

  ngOnInit(): void {
    const role = this._authService.getUserRole();
    this.isAdmin = role === 'Admin';
    this.getAllEmployees();

    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(), // Trigger only when the search term changes
      takeUntil(this.destroy$)
    )
      .subscribe(term => {
        this.applyFilters(term);
      })
  }

  getAllEmployees() {
    this.loaded$.pipe(take(1)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(loadEmployees());
      }
    })
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(deleteEmployee({ id }));
    }
  }

  applyFilters(value = '') {
    const term = value;

    let result = this.employee$.pipe(
      map((employees: Employee[]) =>
        employees.filter(emp =>
          ['id', 'department', 'userEmail', 'salary'].some(field =>
            emp[field]?.toString().toLowerCase().includes(term)
          )
        )
      )
    );

    this.filteredEmployees$ = result.pipe(
      map((filterEmps) =>
        filterEmps.sort((a, b) => {
          const aVal = a[this.sortField]?.toString().toLowerCase() || '';
          const bVal = b[this.sortField]?.toString().toLowerCase() || '';
          return this.sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        })
      )
    );

    this.currentPage = 1;
  }

  onSearchInput(event: any) {
    const term = event.target.value;
    this.searchTerm$.next(term); // Push the updated search term into the stream
  }

  getTotalPages() {
    this.filteredEmployees$.subscribe((filteredEmployees) => {
      this.totalPages = Math.ceil(filteredEmployees.length / this.pageSize) || 1;
    });
  }

  setSort(field: string) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
    this.applyFilters();
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  navigateToAdd() {
    this.router.navigate(['/employees/add']);
  }

  viewEmployee(emp) {
    this.router.navigate(['/employees/edit/', emp.id]);
  }

  editEmployee(emp) {
    this.router.navigate(['/employees/edit/', emp.id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete(); // Cleanup the subscriptions
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/core/auth.service';
import { sharedImports } from '../../common/shared-imports';
import { AdminComponent } from '../../dashboard/admin/admin.component';
import { HrComponent } from '../../dashboard/hr/hr.component';
import { EmployeeComponent } from '../../dashboard/employee/employee.component';

@Component({
  selector: 'app-dashboard',
  imports: [sharedImports, AdminComponent, HrComponent, EmployeeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  role: string = '';

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.role = this._authService.getUserRole() || '';
  }
}

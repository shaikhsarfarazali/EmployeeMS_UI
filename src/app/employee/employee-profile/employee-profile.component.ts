import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { AuthService } from '../../services/core/auth.service';
import { sharedImports } from '../../common/shared-imports';

@Component({
  standalone: true,
  selector: 'app-employee-profile',
  imports: [sharedImports],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent implements OnInit {
  employee: any;


  constructor(private _employeeService: EmployeeService, private _authService: AuthService) { }

  async ngOnInit() {
    await this.getUserId()// JWT or session logic
  }

  async getUserId() {
    this._employeeService.getCurrentUserId().subscribe((res: any) => {
      const userId = res.employeeId;
      this.getEmployeeById(userId);
    })
  }

  getEmployeeById(userId: number) {
    this._employeeService.getSingleEmpById(userId).subscribe({
      next: (res) => this.employee = res,
      error: (err) => console.error('Failed to load profile:', err)
    });
  }
}

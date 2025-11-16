import { Component } from '@angular/core';
import { AuthService } from '../../services/core/auth.service';
import { Router, RouterModule } from '@angular/router';
import { sharedImports } from '../../common/shared-imports';

@Component({
  selector: 'app-main-layout',
  imports: [sharedImports, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true
})
export class MainLayoutComponent {
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  isAdminOrHR(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Admin' || role === 'Manager';
  }

  isEmployee(): boolean {
    const role = this.authService.getUserRole();
    return role === 'Employee';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
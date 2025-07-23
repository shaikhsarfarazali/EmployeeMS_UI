import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/core/auth.service';
import { sharedImports } from '../../common/shared-imports';

@Component({
  selector: 'app-login',
  imports: [sharedImports],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        const role = this.authService.getUserRole();
        if (role === 'Employee') this.router.navigate(['profile']);
        else if (role === 'Admin' || role === 'Manager') this.router.navigate(['employees']);
        else this.router.navigate(['unauthorized']);
      },

      error: (err) => {
        this.errorMessage = 'Invalid credentials';
        console.error('Login failed:', err);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
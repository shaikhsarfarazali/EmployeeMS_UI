import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/core/auth.service';
import { Router } from '@angular/router';
import { sharedImports } from '../../common/shared-imports';

@Component({
  selector: 'app-register',
  imports: [sharedImports],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.invalid) return;
    this._authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['login']);
      },

      error: (err) => {
        this.errorMessage = 'Invalid credentials';
        console.error('Login failed:', err);
      }
    });
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/core/auth.service';
import { sharedImports } from '../../common/shared-imports';
import { HttpClient } from '@angular/common/http';
import { combineLatest, concatMap, exhaustMap, filter, interval, mergeMap, of, Subject, switchMap, take, takeUntil, forkJoin } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [sharedImports],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  destroy$ = new Subject<void>();

  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    // this.mapsExample();
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


  mapsExample() {

    let postIds = interval(1).pipe(
      filter((val) => val > 0),
      take(5)
    )


    let userData$ = forkJoin  // forkjoin will wait for all observables to complete before emitting the last value from each
      (postIds.pipe(mergeMap
        ((id) => this.http.get(`https://jsonplaceholder.typicode.com/todos/${id}`))
      )
      )
    let dynamicData$ = postIds.pipe(
      mergeMap    // for parallel requests
        // switchMap  // for cancelling previous requests
        // concatMap  // for sequential requests
        // exhaustMap // for ignoring new requests while one is in progress
        ((id) => this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`)))

    let userNames = of(['Alice', 'Bob', 'Charlie', 'Dave', 'Eve']); // Mock another observable

    combineLatest([userData$, dynamicData$, userNames]) // Combine the latest values from both observables
      .pipe(takeUntil(this.destroy$))
      .subscribe(([users, dynamicData, names]) => {
        console.log('User data:', users);
        console.log('dynamic daya:', dynamicData);
        console.log('User names:', names);
      });
  }

  ngonDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
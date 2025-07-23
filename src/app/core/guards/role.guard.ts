import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/core/auth.service';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.getUserRole() || ''; // get from token

    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      router.navigate(['/unauthorized']);
      return false;
    }
  };
}
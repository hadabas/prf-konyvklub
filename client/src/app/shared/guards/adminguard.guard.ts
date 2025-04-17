import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DbService } from '../services/db.service';
import { catchError, map, of, switchMap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const dbService = inject(DbService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    switchMap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return of(false);
      }

      return dbService.getUser().pipe(
        map(user => {
          if (user.role !== 'admin') {
            router.navigate(['/dashboard']);
            return false;
          }
          return true;
        }),
        catchError(error => {
          console.error('Admin check error:', error);
          router.navigate(['/dashboard']);
          return of(false);
        })
      );
    }),
    catchError(error => {
      console.error('Auth check error:', error);
      router.navigate(['/dashboard']);
      return of(false);
    })
  );

};
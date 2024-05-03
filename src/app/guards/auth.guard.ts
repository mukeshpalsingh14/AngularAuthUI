import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  return inject(AuthService).isLoggedIn()
    ? true
    : inject(Router).createUrlTree(['/login']);

};
// export const authGuard = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   console.log('1');
//   if (authService.isLoggedIn()) {
//     console.log('true');
//     return true;
//   }

//   // Redirect to the login page
//   return router.parseUrl('/login');
// };
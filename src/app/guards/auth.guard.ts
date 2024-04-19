import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Role } from '../models';

export const authGuard = (role: Role): CanActivateFn => {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const session = inject(SessionService);
    const account = session.getSessionAccount();
    const token = session.getSessionToken();
    if (!account && !token) {
      inject(Router).navigate(['/home']);
      return false;
    }
    if (!account?.roles.includes(role)) {
      inject(Router).navigate(['/home']);
      return false;
    }
    return true;
  };
};

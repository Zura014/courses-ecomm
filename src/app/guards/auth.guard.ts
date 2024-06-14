import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const protectedRoutes: string[] = ['/register', '/login'];
  return protectedRoutes.includes(state.url) && !localStorage.getItem('accessToken') ? true : false;

};

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

export const profileGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const protectedRoutes: string[] = [
    '/profile',
    '/profile-edit',
    '/profile-delete',
    '/my-courses',
  ];
  return protectedRoutes.includes(state.url) &&
  localStorage.getItem('accessToken')
  ? true
  : state.url.replace(state.url, '/home'), false;
};

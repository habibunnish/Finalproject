import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = sessionStorage.getItem('UsertToken');
      const admin = sessionStorage.getItem('adminToken');
  
      if (user !== null || admin !== null) {
        console.log('User is logged in');
        return true;
      } else {
        console.log('User is not logged in, redirecting to login page');
        this.router.navigateByUrl('/login-form');
        return false;
      }
    }
  }

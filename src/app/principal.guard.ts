import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
declare const firebase : any;
@Injectable({
  providedIn: 'root'
})
export class PrincipalGuard implements CanActivate {

  constructor(private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let context = this;
     

      return new Promise<boolean>((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            resolve(true)
          } else {
            context.router.navigate(['/login'])
            resolve(false)
          }
        });
      });
  }
  
}

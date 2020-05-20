import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService} from './services/authentication.service';
import { RouterService } from './services/router.service';
@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public routerService: RouterService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(typeof(this.authService.getBearerToken()), '--', this.authService.getBearerToken());
    if(this.authService.getBearerToken()!== null){
      const booleanPromise = this.authService.isUserAuthenticated(this.authService.getBearerToken());
      console.log('booleanPromise: ', booleanPromise);
    return booleanPromise.then((authenticated) => {
      if (!authenticated) {
        console.log('Hello from Route Guard - to login');
        this.routerService.routeToLogin();
      }
      authenticated = true;
      console.log('You are authenticated',authenticated);
      return authenticated;
    });
    }
    console.log('Redirecting to login');
    this.routerService.routeToLogin();  
  }
  }
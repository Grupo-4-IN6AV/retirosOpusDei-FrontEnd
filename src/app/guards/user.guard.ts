import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { CredentialsRestService } from '../services/credentialsRest/credentials-rest.service';


@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private credentialReset: CredentialsRestService,
    public router: Router
  ) { }

  canActivate() {
    if (this.credentialReset.getIdentity().role === 'CLIENT') {
      return true;
    } else {
      this.router.navigateByUrl('');
      localStorage.clear();
      return false;
    }
  }

}

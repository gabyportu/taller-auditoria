import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
    }

  

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // get the condition to check by companyID
    const shouldCheckByCompany  =route.data['useCompany'];
    
    
    // this page is protected

    if(shouldCheckByCompany){
      // will protect with companyId
      var companyId = localStorage.getItem('companyId')
      let requiredRoles2 = requiredRoles.map( (item) => item+"."+companyId)
      const authorized = requiredRoles2.every((role) => this.roles.includes(role));
     
      if (!authorized) this.router.navigate(['error']) 
      return requiredRoles2.every((role) => this.roles.includes(role));
    }

     
    

    const authorized = requiredRoles.every((role) => this.roles.includes(role));
    if (!authorized) this.router.navigate(['error'])

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}
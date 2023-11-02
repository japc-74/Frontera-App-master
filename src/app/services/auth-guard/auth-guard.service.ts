import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
      public authenticationService: AuthenticationService
        ) {}
 
    canActivate():boolean {
      const isAuthenticated = this.authenticationService.isAuthenticated();
      console.log("IS AUTHENTICATED", isAuthenticated)
      return this.authenticationService.isAuthenticated();
    }
 
}
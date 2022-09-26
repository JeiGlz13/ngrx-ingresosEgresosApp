import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this._authService.isAuth()
      .pipe(
        tap(state => {
          if (!state) {
            this._router.navigate(['/login'])
          }
        })
      );
  }

}

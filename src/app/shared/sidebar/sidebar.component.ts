import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {
  public user!: Usuario;
  public userSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userSubscription = this._store.select('user')
      .subscribe(({ user }) => {
        if (user) {
          this.user = user;
        }
      });
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }

  logout() {
    this._authService.logout()
      .then(() => {
        this._router.navigate(['/login'])
      });
  }

}

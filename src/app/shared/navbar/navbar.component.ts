import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user!: Usuario;
  public userSubscription!: Subscription;

  constructor(
    private _store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.userSubscription = this._store.select('user')
      .subscribe(({ user }) => {
        if (user) {
          this.user = user;
        }
      })
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }

}

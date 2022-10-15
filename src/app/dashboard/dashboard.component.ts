import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public userSubscription!: Subscription;

  constructor(
    private _store: Store<AppState>,
    private _ingresoService: IngresoEgresoService,
  ) { }

  ngOnInit(): void {
    this.userSubscription = this._store.select('user')
      .pipe(
        filter((auth) => auth.user !== null)
      )
      .subscribe(({ user }) => {
        this._ingresoService.leerIngresosEgresos(user!?.uid)
          .then((snapData) => {
            const data: any = snapData.docs.map((ingreso) => ingreso.data());
            this._store.dispatch(setItems({ items: data }));
          })
      });
  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
  }

}

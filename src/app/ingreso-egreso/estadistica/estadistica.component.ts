import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html'
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  ingresosSubscribe!: Subscription;

  constructor(
    private _store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.ingresosSubscribe = this._store.select('items')
      .subscribe(({items}) => {
        this.generarEstadistica(items);
      })
  }

  ngOnDestroy(): void {
    this.ingresosSubscribe.unsubscribe();
  }

  generarEstadistica(items: IngresoEgreso[]) {
    items.forEach((item) => {
      if (item.tipo === 'ingreso') {
        this.ingresos += 1;
        this.totalIngresos += item.monto;
      } else {
        this.egresos += 1;
        this.totalEgresos += item.monto;
      }
    })

    // this.totalIngresos = items.reduce((acc, item) => {
    //   if (item.tipo === 'ingreso') {
    //     this.ingresos += 1;
    //     return acc + item.monto
    //   }

    //   return acc;
    // }, 0);

    // this.totalEgresos = items.reduce((acc, item) => {
    //   if (item.tipo === 'egreso') {
    //     this.egresos += 1;
    //     return acc + item.monto
    //   }

    //   return acc;
    // }, 0);
  }

}

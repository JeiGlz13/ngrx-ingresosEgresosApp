import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { deleteItems } from '../ingreso-egreso.actions';
import { AppStateWithItems } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos!: IngresoEgreso[];
  ingresosSubscription!: Subscription;

  constructor(
    private _store: Store<AppStateWithItems>,
    private _ingresoService: IngresoEgresoService,
  ) { }

  ngOnInit(): void {
    this.ingresosSubscription = this._store.select('items')
      .subscribe(({ items }) => {
        this.ingresosEgresos = items;
      });
  };

  ngOnDestroy(): void {
      this.ingresosSubscription.unsubscribe();
  }

  borrar(ingresoId: string, uid: string): void {
    this._ingresoService.borrarIngresoEgreso(ingresoId, uid)
      .then(() => {
        this._store.dispatch(deleteItems({ingresoId}));
        Swal.fire('Eliminado', 'El item ha sido eliminado', 'success')
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'))
  }
}

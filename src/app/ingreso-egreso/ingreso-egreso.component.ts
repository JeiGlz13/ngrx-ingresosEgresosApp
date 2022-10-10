import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { isLoading } from '../shared/ui.actions';
import { stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  userId!: string;
  userSubscription!: Subscription;
  uiSubscription!: Subscription;
  cargando!: boolean;

  constructor(
    private _fb: FormBuilder,
    private store: Store<AppState>,
    private _ies: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.ingresoForm = this._fb.group({
      descripcion: [
        '',
        [Validators.required],
      ],
      monto: [
        '',
        [Validators.required],
      ],
    });

    this.userSubscription = this.store.select('user')
      .subscribe(({user}) => {
        this.userId = user?.uid || 'error';
      });

    this.uiSubscription = this.store.select('ui')
      .subscribe(({isLoading}) => {
        this.cargando = isLoading;
      });
  };

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.uiSubscription.unsubscribe();
  }

  guardar() {
    if (this.ingresoForm. invalid) return;
    this.store.dispatch(isLoading());

    const { monto, descripcion } = this.ingresoForm.value;
    const ingresoEngresoValue = new IngresoEgreso(descripcion, monto, this.tipo, this.userId);
    this._ies.crearIngresoEgreso(ingresoEngresoValue)
      .then(() => {
        Swal.fire('Registro creado', descripcion, 'success');
        this.ingresoForm.reset();
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      })
      .finally(() => {
        this.store.dispatch(stopLoading());
      })
  }
}

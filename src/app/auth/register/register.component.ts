import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm!: FormGroup;
  cargando: boolean = false;
  uiSubscribe!: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.registroForm = this._fb.group({
      nombre: [
        '',
        [Validators.required],
      ],
      correo: [
        '',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        [Validators.required],
      ],
    });

    this.uiSubscribe = this._store.select('ui')
      .subscribe((ui) => this.cargando = ui.isLoading);
  };

  ngOnDestroy(): void {
      this.uiSubscribe.unsubscribe();
  }

  crearUsuario(){
    if (this.registroForm.invalid) return;
    this._store.dispatch(isLoading());
    const { nombre, correo, password } = this.registroForm.value;

    this._authService.crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        this._store.dispatch(stopLoading())
        this._router.navigate(['/']);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      })
  }

}

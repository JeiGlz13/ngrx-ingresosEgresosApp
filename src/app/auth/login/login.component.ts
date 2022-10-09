import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [Validators.required],
      ]
    });

    this.uiSubscription = this._store.select('ui')
      .subscribe((ui) => this.cargando = ui.isLoading);
  }

  ngOnDestroy(): void {
     this.uiSubscription.unsubscribe();

  }

  login() {
    if (this.loginForm.invalid) return;

    this._store.dispatch(isLoading());

    const { email, password } = this.loginForm.value;
    this._authService.loginUsuario(email, password)
      .then((credenciales) => {
        this._store.dispatch(stopLoading());
        this._router.navigate(['/'])
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

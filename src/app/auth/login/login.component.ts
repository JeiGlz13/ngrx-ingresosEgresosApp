import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
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
    })
  }

  login() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this._authService.loginUsuario(email, password)
      .then((credenciales) => {
        console.log(credenciales);
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

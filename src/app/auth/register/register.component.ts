import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
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
    })
  };

  crearUsuario(){
    if (this.registroForm.invalid) return;

    const { nombre, correo, password } = this.registroForm.value;

    this._authService.crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        console.log(credenciales);
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

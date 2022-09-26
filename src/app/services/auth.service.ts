import { Injectable } from '@angular/core';

import 'firebase/firestore';

import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState
 } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: Auth,
    public firestore: Firestore,
  ) { }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({user}) => {
        const newUser = new Usuario(user?.uid!, nombre, email);
        const userRef = collection(this.firestore, 'user');
        return addDoc(userRef, {...newUser});
      })
  }

  loginUsuario(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  initAuthListener() {
    authState(this.auth).subscribe((fbUser) => {
      console.log(fbUser);
      console.log(fbUser?.uid);
      console.log(fbUser?.email);
    })
  };

  isAuth() {
    return authState(this.auth)
      .pipe(
        map((fbUser) => fbUser != null)
      );
  }
}

import { Injectable } from '@angular/core';

import 'firebase/firestore';

import {
  Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState
 } from '@angular/fire/auth';
import { Firestore, collection, addDoc, getFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unsetUser } from '../auth/auth.actions';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: Auth,
    public firestore: Firestore,
    private _store: Store<AppState>
  ) { }

  crearUsuario(nombre: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({user}) => {
        const newUser = new Usuario(user?.uid!, nombre, email);
        const db = getFirestore()
        return setDoc(doc(db, 'user', user.uid), {...newUser});
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
      // console.log(fbUser?.uid);
      if (fbUser) {
        const db = getFirestore()
        const userRef = doc(db, `user`, fbUser.uid);
        getDoc(userRef).then((userData: any) => {
         const user = Usuario.fromFirestore(userData.data());
          this._store.dispatch(setUser({ user }));
        })
      } else {
        this._store.dispatch(unsetUser());
        this._store.dispatch(unSetItems());
      }
    })
  };

  isAuth() {
    return authState(this.auth)
      .pipe(
        map((fbUser) => fbUser != null)
      );
  }
}

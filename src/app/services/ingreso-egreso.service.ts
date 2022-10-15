import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { getFirestore, collection, doc, addDoc } from '@angular/fire/firestore';
import { deleteDoc, getDocs, setDoc } from 'firebase/firestore';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { addItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private _store: Store<AppState>,
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = ingresoEgreso.uid;
    const db = getFirestore()
    const userRef = doc(db, 'user', uid);
    const ingresoRef = collection(userRef, 'ingresoEgreso');
    return addDoc(ingresoRef, { ...ingresoEgreso, ingresoId: 'ingresoId' })
      .then((ingresoUploaded) => {
        const ingresoWithId = {
          ...ingresoEgreso,
          ingresoId: ingresoUploaded.id,
        };
        setDoc(doc(userRef, 'ingresoEgreso', ingresoUploaded.id), ingresoWithId);
        this._store.dispatch(addItems({ item: ingresoWithId }))
      })
      .catch((error) => console.log(error))
  }

  leerIngresosEgresos(uid: string) {
    const db = getFirestore()
    const userRef = doc(db, 'user', uid);
    const ingresoRef = collection(userRef, 'ingresoEgreso');
    return getDocs(ingresoRef);
  }

  borrarIngresoEgreso(ingresoId: string, uid: string) {
    const db = getFirestore()
    const userRef = doc(db, 'user', uid);
    const ingresoRef = doc(collection(userRef, 'ingresoEgreso'), ingresoId);
    return deleteDoc(ingresoRef);
  }
}

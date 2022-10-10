import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { getFirestore, collection, doc, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor() { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = ingresoEgreso.uid;
    const db = getFirestore()
    const userRef = doc(db, 'user', uid);
    const ingresoRef = collection(userRef, 'ingresoEgreso');
    return addDoc(ingresoRef, {
      ...ingresoEgreso
    })
  }
}

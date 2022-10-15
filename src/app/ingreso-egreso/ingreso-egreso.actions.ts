import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const setItems = createAction(
  '[IngresoEgreso] setItems',
  props<{items: IngresoEgreso[]}>(),
);
export const deleteItems = createAction(
  '[IngresoEgreso] delete items',
  props<{ingresoId:string}>(),
);
export const addItems = createAction(
  '[IngresoEgreso] add items',
  props<{item: IngresoEgreso}>(),
);
export const unSetItems = createAction('[IngresoEgreso] unSetItems');

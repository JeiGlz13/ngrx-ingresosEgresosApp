import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { deleteItems, setItems, unSetItems, addItems } from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithItems extends AppState {
  items: State,
}

export const initialState: State = {
   items: [],
}

export const ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(deleteItems, (state, { ingresoId }) => ({
      ...state,
      items: state.items.filter((ingreso) => ingreso.ingresoId !== ingresoId),
    })),
    on(addItems, (state, { item }) => ({
      ...state,
      items: [...state.items, item ],
    })),
    on(unSetItems, (state) => ({ ...state, items: [] })),

);

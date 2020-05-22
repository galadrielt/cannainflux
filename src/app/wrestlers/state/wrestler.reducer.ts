import { Wrestler } from './../wrestler';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const WRESTLER = 'wrestler';

export interface WrestlerState {
  showImage: boolean;
  wrestlers: Wrestler[];
  filteredWrestlers: Wrestler[];
}

const initialState: WrestlerState = {
  showImage: true,
  wrestlers: [],
  filteredWrestlers: []
};

const getWrestlerFeatureState = createFeatureSelector<WrestlerState>(WRESTLER);

export const getShowImages = createSelector(
  getWrestlerFeatureState,
  state => state.showImage
);

export const getWrestlers = createSelector(
  getWrestlerFeatureState,
  state => state.wrestlers
);

export const getFilteredWrestlers = createSelector(
  getWrestlerFeatureState,
  state => state.filteredWrestlers
);

export function reducer(state = initialState, action): WrestlerState {
  console.log('State: ', state);
  switch (action.type) {
    case 'TOOGLE_IMAGE_CODE':
      return {
        ...state,
        showImage: !state.showImage
      };

    default:
      return state;
  }
}

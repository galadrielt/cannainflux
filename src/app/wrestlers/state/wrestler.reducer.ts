import { Wrestler } from './../wrestler';

export interface WrestlerState {
  showImage: boolean,
  wrestlers: Wrestler[],
  filteredWrestlers: Wrestler[]
}



export function reducer (state, action) {
  switch (action.type) {
    case 'TOOGLE_IMAGE_CODE':
      return {
        ...state,
        showImage: action.payload
      };

    default:
      return state;
  }
}

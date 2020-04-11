import { Wrestler } from './../wrestlers/wrestler';
import { WrestlerState } from '../wrestlers/state/wrestler.reducer';

export interface State {
  wrestlers: WrestlerState;
}

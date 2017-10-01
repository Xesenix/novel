import { ActionReducerMap } from '@ngrx/store';
import * as fromStage from './stages';

export interface State {
	stages: fromStage.State;
}

export const reducer: ActionReducerMap<State> = {
	stages: fromStage.reducer
};

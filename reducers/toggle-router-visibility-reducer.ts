import {SHOW_BAR_ACTION, ShowBarActionType, ShowBarState } from '@constants/router-types';

const initialState: ShowBarState = {
    visibility: true
}

export default function ToggleRouterBarVisibilityReducer(state = initialState, action: ShowBarActionType ): ShowBarState {
    switch(action.type) {
        
        case SHOW_BAR_ACTION:
            return {            
                visibility: action.payload.visibility
            };
        default:
            return state;
    }
}
import { SHOW_BAR_ACTION, ShowBarActionType } from '@constants/router-types';

export function ToggleRouterBarVisibilityAction(visibility: boolean): ShowBarActionType {
    return{ 
        type:SHOW_BAR_ACTION,
        payload: {visibility: visibility}
    }
}
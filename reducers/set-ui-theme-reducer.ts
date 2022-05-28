import { act } from 'react-test-renderer';
import { APP_THEME, ThemeState, SetThemeActionStore, LIGHT } from '@constants/theme-types';

const initialState: ThemeState = {
    theme: LIGHT
}

export default function SetUIThemeReducer(state = initialState, action:SetThemeActionStore): ThemeState {
    switch (action.type) {
        case APP_THEME:{
            return {
               theme: action.payload.theme
            }
        }
        default: return state
    }
}
import { APP_THEME, SetThemeActionStore } from '@constants/theme-types';

export function SetUIThemeAction(theme: string): SetThemeActionStore {
    return{ 
        type: APP_THEME,
        payload: { theme: theme  }
    }
}
export const DEFAULT = '#FFFFFF';
export const DARK = 'DARK-MODE';
export const APP_THEME = 'THEME';
export const LIGHT = 'LIGHT-MODE'

export interface SetTheme{
    theme: string 
}

export interface ThemeState{
    theme: SetTheme['theme']
}

export interface SetThemeActionStore {
    type: typeof APP_THEME,
    payload: {theme: string}
}

export type SetThemeAction = SetThemeActionStore
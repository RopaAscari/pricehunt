export const SHOW_BAR_ACTION ='SHOW-BAR'

export interface ShowBarState {
    visibility: boolean
}

export interface ShowBarAction{
    visibility: ShowBarState['visibility']
}

export interface ShowBarActionStore{
    type: typeof SHOW_BAR_ACTION,
    payload: {visibility: boolean}
}

export type ShowBarActionType = ShowBarActionStore
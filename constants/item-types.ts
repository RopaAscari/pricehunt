import { Item } from './type-definitions'

export const SET_ITEM_STEP = 'SET_STEP';
export const SET_ITEM_ACTION = 'SET_ITEM';
export const SEARCH_ITEM_ACTION = 'SEARCH_ITEM';

export interface SetItem {
    item: Item
}

export interface ItemState {
    item: SetItem['item']
}

export interface SetItemActionStore {
    type: typeof SET_ITEM_ACTION
    payload: { item: Item }
}

export interface SearchItem {
    searched: string
}

export interface SearchItemState {
    searched: SearchItem['searched']
}

export interface SearchItemStore {
    type: typeof SEARCH_ITEM_ACTION,
    payload: { searched: string }
}

// ADD ITEM STATE//

export interface SetItemStep{
    step: number
}

export interface ItemStepState{
    step: SetItemStep['step']

}

export interface SetItemStepStore{
    type: typeof SET_ITEM_STEP,
    payload: { step: number }
}
//

// ** TYPE EXPORTS ** //
export type StepAction = SetItemStepStore

export type SetItemActionType = SetItemActionStore
export type SearchItemActionType = SearchItemStore
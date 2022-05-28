import { SET_ITEM_ACTION, ItemState, SetItemActionType } from '@constants/item-types';

const initialState: ItemState = {
    item: { }
}

export default function SetItemReducer (state = initialState, action:SetItemActionType): ItemState {
    switch (action.type) {
        case SET_ITEM_ACTION:{
            return {
                item: action.payload.item
            }
        }
        default: return state
    }
}
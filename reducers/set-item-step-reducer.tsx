import { SET_ITEM_STEP, ItemStepState, SetItemStepStore } from '@constants/item-types';

const initialState: ItemStepState = {
    step: 0
}

export default function SetItemStepReducer (state = initialState, action:SetItemStepStore): ItemStepState {
    switch (action.type) {
        case SET_ITEM_STEP:{
            return {
                step: action.payload.step
            }
        }
        default: return state
    }
}
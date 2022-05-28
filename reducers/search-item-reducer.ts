import { SEARCH_ITEM_ACTION, SearchItemState, SearchItemActionType } from '@constants/item-types';

const initialState: SearchItemState = {
    searched: ''
}

export default function SearchItemReducer (state = initialState, action:SearchItemActionType): SearchItemState {
    switch (action.type) {
        case SEARCH_ITEM_ACTION:{
            return {
                searched: action.payload.searched
            }
        }
        default: return state
    }
}
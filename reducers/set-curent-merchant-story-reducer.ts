import { SET_CURRENT_STORY, SetCurentMerchantStoryState, SetCurentMerchantStoryActionType } from '@constants/user-types';

const initialState: SetCurentMerchantStoryState = {
    id:''
}

export default function SetMerchantStoryReducer (state = initialState, action:SetCurentMerchantStoryActionType): SetCurentMerchantStoryState {
    switch (action.type) {
        case SET_CURRENT_STORY:{
            return {
               id: action.payload.id
            }
        }
        default: return state
    }
}
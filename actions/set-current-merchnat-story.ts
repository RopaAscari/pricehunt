import { Item } from '../constants/type-definitions';
import { SET_CURRENT_STORY, SetCurentMerchantStoryActionType } from '@constants/user-types';

export function SetCurrentMerchantStoryAction(id: string): SetCurentMerchantStoryActionType{
    return { 
        type: SET_CURRENT_STORY,
        payload:{ id }
    }
}

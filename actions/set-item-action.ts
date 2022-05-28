import { Item } from '../constants/type-definitions';
import { SET_ITEM_ACTION, SetItemActionType } from '@constants/item-types';

export function SetItemAction(item: Item): SetItemActionType{
    return { 
        type: SET_ITEM_ACTION,
        payload:{ item }
    }
}
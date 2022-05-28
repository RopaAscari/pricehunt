import { SEARCH_ITEM_ACTION, SearchItemActionType } from '@constants/item-types';

export function SearchItemAction(searched: string): SearchItemActionType{
    return { 
        type: SEARCH_ITEM_ACTION,
        payload:{ searched }
    }
}
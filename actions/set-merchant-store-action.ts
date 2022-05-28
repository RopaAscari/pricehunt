import { MERCHANT_STORE_ACTION, SetMerchantStoreActionType } from '@constants/merchant-store-types';

export function SetMerchantStoreAction(storeRef: string): SetMerchantStoreActionType {
    return{ 
        type: MERCHANT_STORE_ACTION,
        payload: { storeRef }
    }
}
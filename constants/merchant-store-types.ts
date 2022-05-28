export const MERCHANT_STORE_ACTION = 'MERCHANT_STORE';

export interface MerchantStoreState {
    storeRef: any
}

export interface ItemState {
    storeRef: MerchantStoreState['storeRef']
}

export interface SetMerchantStoreActionStore {
    type: typeof MERCHANT_STORE_ACTION
    payload: { storeRef: any }
}

export type SetMerchantStoreActionType = SetMerchantStoreActionStore
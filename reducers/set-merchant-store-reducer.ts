import { MERCHANT_STORE_ACTION, MerchantStoreState, SetMerchantStoreActionStore} from '@constants/merchant-store-types';

const initialState: MerchantStoreState = {
    storeRef:{}
}

export default function SetMerchantStoreReducer (state = initialState, action:SetMerchantStoreActionStore): MerchantStoreState {
    switch (action.type) {
        case MERCHANT_STORE_ACTION:{
            return {
                storeRef: action.payload.storeRef
            }
        }
        default: return state
    }
}
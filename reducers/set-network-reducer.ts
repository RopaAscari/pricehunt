import { NETWORK_ACTION, NetworkState, SetNetworkActionStore} from '@constants/network-types';

const initialState: NetworkState = {
    networkConnection: {}
}

export default function SetNetWorkReducer (state = initialState, action:SetNetworkActionStore): NetworkState {
    switch (action.type) {
        case NETWORK_ACTION:{
            return {
                networkConnection: action.payload.isNetworkConnected
            }
        }
        default: return state
    }
}
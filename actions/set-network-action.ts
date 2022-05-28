import { NETWORK_ACTION, SetNetworkActionType } from '@constants/network-types';
import { NetInfoState } from '@react-native-community/netinfo';

export function SetNetworkAction(isNetworkConnected: NetInfoState): SetNetworkActionType {
    return{ 
        type: NETWORK_ACTION,
        payload: { isNetworkConnected }
    }
}
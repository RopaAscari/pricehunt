import { NetInfoState } from "@react-native-community/netinfo";

export const NETWORK_ACTION = 'CONNECTIVITY';

export interface SetNetwork{
   networkConnection: NetInfoState 
}

export interface NetworkState{
    networkConnection: SetNetwork['networkConnection']
}

export interface SetNetworkActionStore {
    type: typeof NETWORK_ACTION,
    payload: {isNetworkConnected: NetInfoState}
}

export type SetNetworkActionType = SetNetworkActionStore
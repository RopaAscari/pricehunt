import { USER_TOKEN_ACTION, SetUserTokenAction } from '@constants/user-types';

export function SetUserToken(token: any): SetUserTokenAction {
    return{ 
        type: USER_TOKEN_ACTION,
        payload: { token }
    }
}
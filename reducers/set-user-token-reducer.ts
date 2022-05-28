import { USER_TOKEN_ACTION, UserTokenState, SetUserTokenAction } from '@constants/user-types';

const initialState: UserTokenState   = {
    token: {}
}

export default function SetUserTokenReducer (state = initialState, action: SetUserTokenAction ): UserTokenState  {
    switch (action.type) {
        case USER_TOKEN_ACTION:{
            return {
               token: action.payload.token
            }
        }
        default: return state
    }
}
import { USER_SESSION_ACTION, SessionAction, SessionState } from '@constants/user-types';

const initialState: SessionState   = {
        isloggenIn: false
}

export default function ValidateSessionReducer (state = initialState, action: SessionAction ): SessionState  {
    switch (action.type) {
        case USER_SESSION_ACTION:{
            return {
                isloggenIn: action.payload.session
            }
        }

        default: return state
    }
}
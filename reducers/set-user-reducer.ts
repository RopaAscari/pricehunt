import { SET_USER_ACTION, REMOVE_USER_ACTION, UserState, SetUserActionType, RemoveUserActionType } from '@constants/user-types';

const initialState: UserState   = {
    user: { }, 
    //isloggenIn: false
}

export default function SetUserReducer (state = initialState, action: SetUserActionType | RemoveUserActionType ): UserState  {
    switch (action.type) {
        case SET_USER_ACTION:{
            return {
                user: action.payload.user
            }
        }
        case REMOVE_USER_ACTION:{
           return {
              user: { }
           }
        }
        default: return state
    }
}
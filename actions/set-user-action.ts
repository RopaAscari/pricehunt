import { User } from '@constants/type-definitions' ;
import { SET_USER_ACTION, SetUserActionType } from '@constants/user-types';

export function SetUserAction(user: User): SetUserActionType {
    return{ 
        type: SET_USER_ACTION,
        payload: { user }
    }
}
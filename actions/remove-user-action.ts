import { REMOVE_USER_ACTION, RemoveUserActionType } from '@constants/user-types';

export function RemoveUserAction(): RemoveUserActionType {
    return{ 
        type: REMOVE_USER_ACTION,
        payload: { user: null }
    }
}
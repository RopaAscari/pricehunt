import { USER_SESSION_ACTION, SessionAction } from '@constants/user-types';

export function ValidateSessionAction (session: boolean) :SessionAction {
    return{
        type: USER_SESSION_ACTION,
        payload: { session }
    }
}
import { UpdateProfilePicActionType, UPDATE_PROFILE_PIC } from '@constants/user-types'

export function UpdateProfilePicAction(user: any): UpdateProfilePicActionType {
    return{ 
        type: UPDATE_PROFILE_PIC,
        payload: { user }
    }
}
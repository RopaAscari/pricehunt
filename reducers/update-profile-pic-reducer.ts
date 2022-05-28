import { UPDATE_PROFILE_PIC, UserState, UpdateProfilePicActionType } from '@constants/user-types';

const initialState: UserState   = {
    user: {}
}

export default function UpdatUserReducer (state = initialState, action: UpdateProfilePicActionType ): UserState  {
    switch (action.type) {
        case UPDATE_PROFILE_PIC:{
            return {
               user: action.payload.user
            }
        }
        default: return state
    }
}
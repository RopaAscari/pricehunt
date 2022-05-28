import { User } from './type-definitions';

export const SET_CURRENT_STORY = 'SET_STORY';
export const SET_ITEM_STEP = 'SET_STEP';
export const ADD_FAVORITE_ITEM = 'ADD_FAV';
export const SET_USER_ACTION = 'SET_USER';
export const USER_TOKEN_ACTION = 'TOKEN';
export const USER_SESSION_ACTION = 'SESSION';
export const DASHBOARD_INITIAL_ACTION = 'DASH';
export const DASHBOARD_USER_ACTION = 'ACCOUNT';
export const REMOVE_USER_ACTION = 'REMOVE_USER';
export const UPDATE_PROFILE_PIC = 'PROFILE_PIC';

// ** USER ACTION TYPE ** //
export interface DashboardInitialAction{
    action: string
}

export interface DashboardState{
    action: DashboardInitialAction['action']
}

interface DashboardStoreNavigation {
    type: typeof DASHBOARD_INITIAL_ACTION;
    payload: { action: string }
}

// ** USER ACCOUNT TYPE ** //
export interface DashboardUserAccountAction{
    accountType: string
}

export interface DashboardUserState{
    accountType: DashboardUserAccountAction['accountType']
}

interface DashboardUserStoreNavigation {
    type: typeof DASHBOARD_USER_ACTION;
    payload: { accountType: string }
}

// ** SET USER  TYPE ** //
export interface SetUser{
    user: User
}

export interface UserState{
    user: SetUser['user']

}

export interface SetUserActionStore{
    type: typeof SET_USER_ACTION,
    payload: { user: User }
}

// ** UPDATE_PROFILE_PIC** //

export interface UpdateProfilePhotoState{
    profilePic: UserState['user']['profilePic']
}

export interface UpdateProfilePhotoStore{
    type: typeof UPDATE_PROFILE_PIC,
    payload: { user: User }
}

// ** FAVOURITE_ITEM ** //
export interface UpdateFavouriteItemState{
    profilePic: UserState['user']['profilePic']
}

export interface UpdateFavouriteItemStore{
    type: typeof UPDATE_PROFILE_PIC,
    payload: { user: User }
}

// ** SESSION ** //
export interface ValidateSession{
    session: boolean
}

export interface SessionState{
  isloggenIn: ValidateSession['session']
}

export interface ValidateSessionStore{
    type: typeof USER_SESSION_ACTION,
    payload: { session: boolean }
}

// REMOVE USER //
export interface RemoveUserActionStore{
    type: typeof REMOVE_USER_ACTION,
    payload: { user: null }
}

// ** TOKEN ** //
export interface SetUserToken{
    token: any
}

export interface UserTokenState{
  token: SetUserToken['token']
}

export interface UserTokenStore{
    type: typeof USER_TOKEN_ACTION,
    payload: { token: any }
}

// ** SET USER  TYPE ** //
export interface SetCurentMerchantStory{
    id: string
}

export interface SetCurentMerchantStoryState{
    id: SetCurentMerchantStory['id']

}

export interface SetCurentMerchantStoryActionStore{
    type: typeof SET_CURRENT_STORY,
    payload: { id: string }
}


//EXPORTS
export type SetCurentMerchantStoryActionType = SetCurentMerchantStoryActionStore

export type SetUserTokenAction = UserTokenStore

export type SessionAction = ValidateSessionStore

export type SetUserActionType = SetUserActionStore

export type DashboardAction = DashboardStoreNavigation

export type RemoveUserActionType = RemoveUserActionStore

export type UpdateProfilePicActionType = UpdateProfilePhotoStore

export type DashboardUserAction = DashboardUserStoreNavigation
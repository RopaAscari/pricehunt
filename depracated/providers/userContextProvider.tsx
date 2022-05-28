import React, { createContext, ReactNode, FC, useReducer } from 'react';

interface User {
    _id:string,
    email: string,
    lastName:string,
    username: string,
    firstName:string,  
    profilePic:string, 
    isloggenIn: boolean,
    favouriteItems:Array<number>
}

interface ContextProps {
    state: User;
    dispatch: {
      setUser: (user: User) => void,
      removeUser: (user: User) => void
      updateProfilePic: (profilePic: User) => void,
      updateFavouriteItem:(favorite: User) => void
    }
}

interface UpdateUserAction {
    type: string
    payload: User ;
}

interface UserStateProps {
    children: ReactNode;
}

const initialState : User = {
    _id:'string',
    email: 'string',
    lastName:'string',
    username: 'string',
    firstName:'string',  
    profilePic:'string',
    favouriteItems:[],
    isloggenIn: false  
}

const userReducer = (state: User, action: UpdateUserAction): User => {
    switch(action.type) {
      case 'USER':
        return {     
          _id:action.payload._id,
          email: action.payload.email,
          lastName:action.payload.lastName,
          username: action.payload.username,
          firstName:action.payload.firstName, 
          profilePic:action.payload.profilePic,
          isloggenIn: action.payload.isloggenIn,
          favouriteItems: action.payload.favouriteItems 
        }
      case 'PIC':
        return {     
          _id:action.payload._id,
          email: action.payload.email,
          lastName:action.payload.lastName,
          username: action.payload.username,
          firstName:action.payload.firstName, 
          profilePic:action.payload.profilePic,
          isloggenIn: action.payload.isloggenIn,
          favouriteItems: action.payload.favouriteItems 
        }
      case 'FAV':{
        return {
          _id:action.payload._id,
          email: action.payload.email,
          lastName:action.payload.lastName,
          username: action.payload.username,
          firstName:action.payload.firstName, 
          profilePic:action.payload.profilePic,
          isloggenIn: action.payload.isloggenIn,
          favouriteItems: action.payload.favouriteItems 
        }
      }
      case 'REMOVE':{
        return {
          _id:action.payload._id,
          email: action.payload.email,
          firstName:action.payload.firstName, 
          lastName:action.payload.lastName,
          username: action.payload.username,
          profilePic:action.payload.profilePic,
          favouriteItems: action.payload.favouriteItems, 
          isloggenIn: action.payload.isloggenIn
        }
      }
      default:
        return state;
    }
}

export const UserContext = createContext({} as ContextProps);

const UserState: FC<UserStateProps> = ({ children }) => {

  const [state, dispatch] = useReducer(userReducer, initialState);

  const updateProfilePic = (profilePic: User) => {
          dispatch({ 
            type:'PIC',
            payload: profilePic
        })
      }

  const updateFavouriteItem = (favouriteItem: User) => {
          dispatch({ 
            type:'FAV',
            payload: favouriteItem
        })
      }

  const setUser = (USER: User) => {
        dispatch({ 
          type:'USER',
          payload: USER
      })
    }

  const removeUser = (USER: User) => {
      dispatch({ 
        type:'USER',
        payload: USER
    })
}

  return(
      <UserContext.Provider value={{ state, dispatch: { updateProfilePic, updateFavouriteItem, setUser, removeUser }}}>
          { children }
      </UserContext.Provider>
    )
}

export default UserState
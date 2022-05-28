import {User} from './type-definitions'
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies';

export const SET_MESSAGE = 'SET_MESSAGE';

export interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    user: User
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
    quickReplies?: QuickReplies
  }

  export interface SetMessages{
    messages: Array<IMessage>
}
  export interface MessageState{
    messages: SetMessages['messages']
}

export interface SetMessageActionStore{
    type: typeof SET_MESSAGE,
    payload: { messages: Array<IMessage> }
}

export type SetMessageActionType = SetMessageActionStore
import { IMessage } from '../constants/message-types';
import { SET_MESSAGE, SetMessageActionType } from '@constants/message-types';

export function SetChatMessagesAction(messages: Array<IMessage>): SetMessageActionType{
    return { 
        type: SET_MESSAGE,
        payload:{ messages }
    }
}
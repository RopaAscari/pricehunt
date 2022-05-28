import { SET_MESSAGE, MessageState, SetMessageActionType } from '@constants/message-types';

const initialState: MessageState = {
    messages: []
}

export default function SetMessagesReducer (state = initialState, action:SetMessageActionType): MessageState {
    switch (action.type) {
        case SET_MESSAGE:{
            return {
               messages: action.payload.messages
            }
        }
        default: return state
    }
}
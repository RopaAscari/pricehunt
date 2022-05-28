import { ChatType } from '@constants/type-definitions'
import { CREATE_CHAT, CreateChatActionType } from '@constants/create-chat-types';

export function CreateChatInstanceAction(chat: ChatType): CreateChatActionType {
    return{ 
        type: CREATE_CHAT,
        payload: { chat: chat }
    }
}
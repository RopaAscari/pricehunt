import { ChatType } from '@constants/type-definitions'

export const CREATE_CHAT = 'CREATE_CHAT';

export interface CreateChat {
    chat: ChatType
}

export interface ChatState {
    chat: CreateChat['chat']
}

export interface CreateChatActionStore {
    type: typeof CREATE_CHAT
    payload: { chat: ChatType }
}

export type CreateChatActionType = CreateChatActionStore
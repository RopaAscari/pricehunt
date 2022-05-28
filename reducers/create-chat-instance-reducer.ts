import { CREATE_CHAT, CreateChatActionType, ChatState } from '@constants/create-chat-types';

const initialState : ChatState = { 
    chat: {
        chatId:'',
        latestMessage:{
            text:'',
            createdAt:'', 
        },
        hunter:{
            id:'',
            name:'',
            photo:'',
            online: false
        },
        merchant:{
            id:'',
            name:'',
            photo:'',
            online: false
        },
    }
}

export default function DashboardInitialReducer (state = initialState, action: CreateChatActionType): ChatState {   
    switch(action.type) {
        
        case CREATE_CHAT:
            return {            
                chat: action.payload.chat
            };
        default:
            return state;
    }
}
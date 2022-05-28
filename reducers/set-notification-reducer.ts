import { NOTIFICATION_ACTION, NotificationState, SetNotificationActionStore} from '@constants/notification-types';

const initialState: NotificationState = {
    notifications: []
}

export default function SetNotificationReducer (state = initialState, action:SetNotificationActionStore): NotificationState {
    switch (action.type) {
        case NOTIFICATION_ACTION:{
            return {
                notifications: action.payload.notifications
            }
        }
        default: return state
    }
}
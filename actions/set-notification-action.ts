import { Notifications, NOTIFICATION_ACTION, SetNotificationActionType } from '@constants/notification-types';


export function SetNotificationsAction(notifications: Array<Notifications>): SetNotificationActionType {
    return{ 
        type: NOTIFICATION_ACTION,
        payload: { notifications }
    }
}
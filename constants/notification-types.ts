export const NOTIFICATION_ACTION = 'NOTIFICATIONS';

export interface Notifications {
    data: string, 
    type: string, 
    date: any 
}

export interface SetNotification{
   notifications: Array<Notifications> 
}

export interface NotificationState{
    notifications: SetNotification['notifications']
}

export interface SetNotificationActionStore {
    type: typeof NOTIFICATION_ACTION,
    payload: {notifications: Array<Notifications>}
}

export type SetNotificationActionType = SetNotificationActionStore
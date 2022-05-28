import {DASHBOARD_USER_ACTION, DashboardUserAction} from '@constants/user-types'

export function SelectAccountUserAction(accountType: string): DashboardUserAction {
    return { 
        type: DASHBOARD_USER_ACTION,
        payload: { accountType }
    }
}
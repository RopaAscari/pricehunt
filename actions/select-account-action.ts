import {DASHBOARD_INITIAL_ACTION, DashboardAction} from '@constants/user-types'

export function selectAccountAction(action: string): DashboardAction {
    return { 
        type: DASHBOARD_INITIAL_ACTION,
        payload: { action }
    }
}
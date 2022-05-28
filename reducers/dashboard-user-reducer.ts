import { DashboardUserAction, DASHBOARD_USER_ACTION, DashboardUserState } from '@constants/user-types';


const initialState : DashboardUserState = { 
    accountType: ' '
}

export default function DashboardUserReducer (state = initialState, action: DashboardUserAction): DashboardUserState {   
    switch(action.type) {
        
        case DASHBOARD_USER_ACTION:
            return {            
                accountType: action.payload.accountType
            };
        default:
            return state;
    }
}
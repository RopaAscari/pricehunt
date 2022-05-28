import { DashboardAction, DASHBOARD_INITIAL_ACTION, DashboardState } from '@constants/user-types';


const initialState : DashboardState = { 
    action: ' '
}

export default function DashboardInitialReducer (state = initialState, action: DashboardAction): DashboardState {   
    switch(action.type) {
        
        case DASHBOARD_INITIAL_ACTION:
            return {            
                action: action.payload.action
            };
        default:
            return state;
    }
}
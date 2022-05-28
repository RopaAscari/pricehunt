import { NavigationScreenProp } from "react-navigation";

export interface Navigation{
    navigation: NavigationScreenProp<any,any>
}

export interface NavigationState{
    nav: Navigation['navigation']['navigate']
}

export const GLOBAL_NAVIGATOR_ACTION = 'navigation';

interface StoreNavigation {
    type: typeof GLOBAL_NAVIGATOR_ACTION;
    payload: { nav: Navigation['navigation']['navigate'] }
}

export type NavigationAction = StoreNavigation
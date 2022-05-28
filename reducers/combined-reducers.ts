import {combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import SetItemReducer from './set-item-reducer';
import SetUserReducer from './set-user-reducer';
import SearchItemReducer from './search-item-reducer';
import SetNetworkReducer from './set-network-reducer';
import SetUIThemeReducer from './set-ui-theme-reducer';
import SetItemStepReducer from './set-item-step-reducer';
import SetUserTokenReducer from './set-user-token-reducer';
import SetMessagesReducer from './set-chat-message-reducer';
import DashboardUserReducer from './dashboard-user-reducer';
import ValidateSessionReducer from './validate-session-reducer';
import AsyncStorage from '@react-native-community/async-storage';
import DashboardInitialReducer from './dashboard-initial-reducer';
import setActiveCategoryReducer from './set-active-category-reducer';
import UpdateProfilePhotoReducer from './update-profile-pic-reducer';
import CreateChatInstanceReducer from './create-chat-instance-reducer'
import SetMerchantStoreReducer from './set-merchant-store-reducer'
import SetNotificationReducer from './set-notification-reducer'
import ToggleRouterBarVisibilityReducer from './toggle-router-visibility-reducer'
import SetMerchantStoryReducer from './set-curent-merchant-story-reducer'

const persistanceConfiguartion = {
  key: 'persist',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: SetUserReducer,
  item: SetItemReducer,
  step: SetItemStepReducer,
  theme: SetUIThemeReducer,
  network: SetNetworkReducer,
  token: SetUserTokenReducer,
  searched: SearchItemReducer,
  messages: SetMessagesReducer,
  session: ValidateSessionReducer,
  chat: CreateChatInstanceReducer,  
  storeRef: SetMerchantStoreReducer,
  notifications:SetNotificationReducer,
  router: ToggleRouterBarVisibilityReducer,
  activeCategory: setActiveCategoryReducer,
  dashboardAction: DashboardInitialReducer,
  currentStoryId: SetMerchantStoryReducer,
  dashboardAccountType: DashboardUserReducer,
  updateProfilePic: UpdateProfilePhotoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const persistedReducer = persistReducer(
  persistanceConfiguartion,
  rootReducer,
);

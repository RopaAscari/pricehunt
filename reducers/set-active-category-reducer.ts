import { CATEGORY_COLOR, CategoryState, SetCategoryActionType } from '@constants/categories-types';

const initialState: CategoryState = {
    isCategoryActive: false
}

export default function setActiveCategoryReducer (state = initialState, action:SetCategoryActionType): CategoryState {
    switch (action.type) {
        case CATEGORY_COLOR:{
            return {
                isCategoryActive: action.payload.isCategoryActive
            }
        }
        default: return state
    }
}
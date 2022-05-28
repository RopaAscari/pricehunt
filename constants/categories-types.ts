export const CATEGORY_COLOR = 'COLOR';

export interface SetCategory{
    isCategoryActive: boolean 
}

export interface CategoryState{
    isCategoryActive: SetCategory['isCategoryActive']
}

export interface SetCategoryActionStore {
    type: typeof CATEGORY_COLOR,
    payload: {isCategoryActive: boolean}
}

export type SetCategoryActionType = SetCategoryActionStore
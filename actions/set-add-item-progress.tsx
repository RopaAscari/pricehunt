import { SET_ITEM_STEP, StepAction } from '@constants/item-types';

export function SetItemStepAction(step: number): StepAction {
    return{ 
        type: SET_ITEM_STEP,
        payload: { step: step }
    }
}
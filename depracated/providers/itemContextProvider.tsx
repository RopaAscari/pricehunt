import { Item } from '../constants/type-definitions'
import React, { createContext, ReactNode, FC, useReducer } from 'react';

interface State {
    item:Item
}

interface ContextProps {
    state: State;
    dispatch: {
      setItemData: (item: any) => void;
    }
}

interface SetItemAction {
    type: string
    payload: State['item'];
}

interface ItemStateProps {
    children: ReactNode;
}

const initialState : State = {
    item:{}
}

const itemReducer = (state: State, action: SetItemAction): State => {
    switch(action.type) {
      case 'ITEM':
        return {     
          item: action.payload
        }
      default:
        return state;
    }
}

export const ItemContext = createContext({} as ContextProps);


 const ItemState: FC<ItemStateProps> = ({ children }) => {

    const [state, dispatch] = useReducer(itemReducer, initialState);

    const setItemData = (items: any) => {
        dispatch({ 
          type:'ITEM',
          payload: items
       })
    }

    return(
        <ItemContext.Provider value={{ state, dispatch: { setItemData }}}>
            { children }
        </ItemContext.Provider>
    )
}

export default ItemState
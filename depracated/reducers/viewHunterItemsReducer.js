const InitialState = {
    SelectedItem:null,
    count:0
}

const ViewHunterItemsReducer = (state = InitialState, action) =>{
   
switch(action.type){
    case "ITEM": { 
        return {...state, SelectedItem: action.payload.SelectedItem}
    }
    case "FAV":{
        return{...state, count:action.payload.count}
    }
    default:{
        return state
    }
  } 
}
export default ViewHunterItemsReducer;
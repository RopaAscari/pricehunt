const InitialState = {
    Item:null
}

const EditMerchantItemReducer = (state = InitialState, action) =>{
   
switch(action.type){
    case "ITEM": { 
        return {...state, Item: action.payload.item}
    }
    default:{
        return state
    }
  } 
}
export default EditMerchantItemReducer;
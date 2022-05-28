import { Alert } from "react-native"

const InitialState = {
    searchParam:""
}

const SearchReducer = (state = InitialState, action) =>{
   
switch(action.type){
    case "SEARCH":{ 
        return{...state, searchParam:action.payload.searchParam}
    }
    default:{
        return state
    }
  } 
}
export default SearchReducer;
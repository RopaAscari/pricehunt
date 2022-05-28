
const InitialState = {
    url:""
}

const ImageReducer = (state = InitialState, action) =>{
   
switch(action.type){
    case "IMAGE":{ 
        return{...state, url:action.payload.url}
    }
    default:{
        return state
    }
  } 
}
export default ImageReducer;
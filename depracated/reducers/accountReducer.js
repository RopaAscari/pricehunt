const initialState = {
 loginStatus:{},
 userObj:{}
}

const AccountReducer = ( state = initialState , action ) => {

    switch(action.type){
        case "LOGIN": {
            return { 
                   ...state,
                   loginStatus:action.payload.status
            }      
        }
        case "USER": {
            return { 
                   ...state,
                   userObj:action.payload.User
            }      
        }
        case "LOGOUT":{
            return{
                ...state, 
                loginStatus:action.payload.login
            }
        }
        default:{
            return state;
        }
    }
}
export default AccountReducer;
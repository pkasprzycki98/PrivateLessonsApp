const loggedReducer = (state = {isLogged: false, token:"", username:"", userId:""}, action) =>{
    switch(action.type){
        case 'SIGN_IN':
            return {
                ...state, token: action.payload.token, isLogged: true, username: action.payload.username, userId: action.payload.userId
            }
        default:
            return {
                ...state
            }
    }
};
export default loggedReducer;
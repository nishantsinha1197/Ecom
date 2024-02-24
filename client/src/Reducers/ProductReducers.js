import { ERROR, FETCHED_DATA, LOADING } from "../Action/ActionType";

function ProductReducers(state,action){
    switch(action.type){
        case LOADING : 
            return {...state,loading:true};
        case FETCHED_DATA : 
            return {...state,loading:false,products:action.payload}
        case ERROR:
            return {...state,loading:false,products:action.payload}
        default:
            return state
    }
}
export default ProductReducers;
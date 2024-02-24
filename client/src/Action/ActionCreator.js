import { ERROR, FETCHED_DATA, LOADING } from "./ActionType";

//this is for inital api request
export function initialData(){
    return {type:LOADING}
}
//this is for fetching the data
export function fetchedData(data){
    return {type:FETCHED_DATA,payload:data}
}
//this is for the error handling while api hitting
export function errorWhileProductApi(err)
{
    return {type:ERROR,payload:err}
}
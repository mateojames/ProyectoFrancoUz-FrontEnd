import {SETCURRENTUSER, SETLOADING } from "../actions/auth";
import { USERLOGOUT } from "../actions/userLogout";

const initialState = {
    currentUser: null,
    isLoading: false
};

export default (state = initialState, action) => {
    switch(action.type){
        case SETCURRENTUSER:
            return {...state, currentUser: action.currentUser, isLoading: false};
        case SETLOADING:
            return {...state, isLoading: true};
        case USERLOGOUT:
            return initialState
    }
    return state
};
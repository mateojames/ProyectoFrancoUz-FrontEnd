import { LOADLOCATIONS, LOADTHERAPIES } from "../actions/resources";
import { USERLOGOUT } from "../actions/userLogout";

const initialState = {
    therapies: [],
    locations:[]
};

export default (state = initialState, action) => {
    switch(action.type){
        case LOADTHERAPIES:
            return {...state, therapies: action.therapies};
        case LOADLOCATIONS:
            return {...state, locations: action.locations};
        case USERLOGOUT:
            return initialState
    }
    return state;
};
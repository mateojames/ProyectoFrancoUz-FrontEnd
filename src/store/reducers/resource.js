import { LOADLOCATIONS, LOADTHERAPIES } from "../actions/resources";

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
    }
    return state;
};
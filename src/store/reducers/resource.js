import { LOADTHERAPIES } from "../actions/resources";

const initialState = {
    therapies: [],
};

export default (state = initialState, action) => {
    switch(action.type){
        case LOADTHERAPIES:
            return {...state, therapies: action.therapies};
    }
    return state;
};
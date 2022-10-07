import { LOADUSERS } from "../actions/loadUsers";

const initialState = {
    users: [],
};

export default (state = initialState, action) => {
    switch(action.type){
        case LOADUSERS:
            return {...state, users: action.users};
    }
    return state;
};
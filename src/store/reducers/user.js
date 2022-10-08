import { EDITUSER } from "../actions/editRole";
import { LOADUSERS } from "../actions/loadUsers";

const initialState = {
    users: [],
};

export default (state = initialState, action) => {
    switch(action.type){
        case EDITUSER:
            const updated = state.users.map((item) => item.id == action.user.id ? action.user : item );
            return {...state, users: updated};
        case LOADUSERS:
            return {...state, users: action.users};
    }
    return state;
};
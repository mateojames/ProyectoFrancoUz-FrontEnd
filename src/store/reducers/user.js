import { UPDATEPROFILE } from "../actions/createUser";
import { EDITUSER } from "../actions/editRole";
import { LOADPATIENTS } from "../actions/loadPatients";
import { LOADPROFESSIONALS } from "../actions/loadProfessionals";
import { LOADUSERS } from "../actions/loadUsers";

const initialState = {
    users: [],
    profile: null,
    patients: [],
    professionals: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case EDITUSER:
            const updated = state.users.map((item) => item.id == action.user.id ? {...item, ...action.user} : item );
            return {...state, users: updated};
        case LOADUSERS:
            return {...state, users: action.users};
        case UPDATEPROFILE:
            return {...state, profile: action.profile};
        case LOADPATIENTS:
            return {...state, patients: action.users};
        case LOADPROFESSIONALS:
            return {...state, professionals: action.users};
    }
    return state;
};
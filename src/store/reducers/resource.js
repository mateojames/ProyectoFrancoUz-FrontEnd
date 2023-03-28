import { USERLOGOUT } from "../actions/userLogout";
import { CREATELOCATION } from "../actions/createLocation";
import { LOADLOCATIONS } from "../actions/loadLocations";
import { UPDATELOCATION } from "../actions/updateLocation";

import { CREATETHERAPY } from "../actions/createTherapy";
import { LOADTHERAPIES } from "../actions/loadTherapies";
import { UPDATETHERAPY } from "../actions/updateTherapy";
import { DELETETHERAPY } from "../actions/deleteTherapy";


const initialState = {
    therapies: [],
    locations:[]
};

export default (state = initialState, action) => {
    switch(action.type){
        case USERLOGOUT:
            return initialState;

        case CREATELOCATION:
            return {...state, locations: state.locations.concat([action.location])};
        case LOADLOCATIONS:
            return {...state, locations: action.locations};
        case UPDATELOCATION:
            const updatedLocations = state.locations.map((item) => item.id == action.location.id ? {...item, ...action.location} : item );
            return {...state, locations: updatedLocations};

        case CREATETHERAPY:
            return {...state, therapies: state.therapies.concat([action.therapy])};
        case LOADTHERAPIES:
            return {...state, therapies: action.therapies};
        case UPDATETHERAPY:
            const updatedTherapies = state.therapies.map((item) => item.id == action.therapy.id ? {...item, ...action.therapy} : item );
            return {...state, therapies: updatedTherapies};
        case DELETETHERAPY:
            const therapies = state.therapies.filter((item) => item.id !== action.therapy.id);
            return {...state, therapies: therapies};
}
    return state;
};
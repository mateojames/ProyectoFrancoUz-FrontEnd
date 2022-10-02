import {appointments} from '../../appointments';
import { LOADAPPOINTMENTS } from "../actions/loadAppointments";

const initialState = {
    appointments: [],
};

export default (state = initialState, action) => {
    switch(action.type){
        case LOADAPPOINTMENTS:
            return {...state, appointments: action.appointments};
    }
    return state;
};
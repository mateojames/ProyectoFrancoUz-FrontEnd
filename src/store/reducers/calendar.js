import {appointments} from '../../appointments';
import { EDITAPPOINTMENT } from '../actions/editAppointment';
import { LOADAPPOINTMENTS } from "../actions/loadAppointments";

const initialState = {
    appointments: [],
    currentAppointment: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case EDITAPPOINTMENT:
            const updated = state.appointments.map((item) => item.id == action.appointment.id ? action.appointment : item );
            return {...state, appointments: updated};
        case LOADAPPOINTMENTS:
            return {...state, appointments: action.appointments};
    }
    return state;
};
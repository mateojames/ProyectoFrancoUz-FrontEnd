import { SHOWMODAL, HIDEMODAL } from "../actions/modal";

const initialState = {
    show: false,
};

export default (state = initialState, action) => {
    switch(action.type){
        case SHOWMODAL:
            return {...state, show: true};
        case HIDEMODAL:
            return {...state, show: false};
    }
    return state;
};
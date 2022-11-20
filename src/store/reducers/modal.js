import { SHOWMODAL, HIDEMODAL } from "../actions/modal";
import { USERLOGOUT } from "../actions/userLogout";

const initialState = {
    show: false,
};

export default (state = initialState, action) => {
    switch(action.type){
        case SHOWMODAL:
            return {...state, show: true};
        case HIDEMODAL:
            return {...state, show: false};
        case USERLOGOUT:
            return initialState
    }
    return state;
};
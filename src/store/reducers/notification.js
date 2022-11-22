import { LOADNOTIFICATIONS } from "../actions/loadNotifications";
import { EDITNOTIFICATION } from "../actions/notificationRead";
import { USERLOGOUT } from "../actions/userLogout";


const initialState = {
    notifications: []
};

export default (state = initialState, action) => {
    switch(action.type){
        case LOADNOTIFICATIONS:
            return {...state, notifications: action.notifications};
        case EDITNOTIFICATION:
            const updated = state.notifications.map((item) => item.id == action.notification.id ? {...item, ...action.notification} : item );
            return {...state, notifications: updated};
        case USERLOGOUT:
            return initialState
    }
    return state;
};
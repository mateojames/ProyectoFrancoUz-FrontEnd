import { LOADNOTIFICATIONS } from "../actions/loadNotifications";
import { EDITNOTIFICATION } from "../actions/notificationRead";

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
    }
    return state;
};
import appointments from '../../today-appointments';

const initialState = {
    appointments: appointments,
};

export default (state = initialState, action) => {
    return state;
};
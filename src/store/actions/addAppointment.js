
export const ADDAPPOINTMENT = 'ADDAPPOINTMENT';
export const LOCATIONNOTAVAILABLE = 'LOCATIONNOTAVAILABLE'

export const addAppointment = (appointment) => {
    return (dispatch, getState) => {
        getState().auth.currentUser.getIdToken(true)
            .then(idToken => {
                fetch('https://backend-asociacion-franco-uz.vercel.app/session', {
                    method: 'POST',
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": idToken
                    },
                    body: JSON.stringify({
                    appointment: appointment.added
                    })
                })
                .then((response) => {
                    console.log('RESPONSE');
                    console.log(response.status);
                    if(response.status == 201 || response.status == 200){
                        console.log('Procedimiento exitoso');
                    }else{
                        console.log('Ocurrió un problema, por favor intente nuevamente.');
                    }
                    return response.json();
                })
                .then((myJson) => {
                    dispatch({type:ADDAPPOINTMENT, appointment: myJson.appointment});
                })
            })
            .catch(err => console.log(err));
    };
};

export const ADDAPPOINTMENT = 'ADDAPPOINTMENT';

export const addAppointment = (appointment) => {
    return (dispatch, getState) => {
        //const token = getState().auth.sessionInfo.idToken;
        console.log('fetch')
        console.log(appointment)
        fetch('http://localhost:8080/session', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
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
            console.log(myJson);
            dispatch({type:ADDAPPOINTMENT});
          })
        .catch(err => console.log(err));
    };
};
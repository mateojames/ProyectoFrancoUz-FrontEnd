
export const EDITUSER = 'EDITUSER';

export const addNotificationToken = (data) => {
    console.log("editProfile, ", data);
    return (dispatch, getState) => {
        const uid = data.user
        console.log('usuario, ',data)
        getState().auth.currentUser.getIdToken(true)
            .then(idToken => {
                fetch(`http://localhost:8080/updateMessageTarget/${uid}`, {
                    method: 'PUT',
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": idToken
                    },
                    body: JSON.stringify({
                    messagingToken: data.notificationToken
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
                    console.log('RESPONSE', myJson);
                    dispatch({type:EDITUSER, user: myJson.user});
                })
            })
            .catch(err => console.log(err));
    };
};
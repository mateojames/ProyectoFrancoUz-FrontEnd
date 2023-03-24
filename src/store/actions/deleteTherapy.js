export const DELETETHERAPY = 'DELETETHERAPY';

export const deleteTherapy = (data , handleLoading) => {
    return (dispatch, getState) => {
        const id = Object.keys(data)[0];
        getState().auth.currentUser.getIdToken(true)
            .then(idToken => {
                fetch(`http://localhost:8080/deleteTherapy/${id}`, {
                    method: 'PUT',
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": idToken
                    },
                    body: JSON.stringify({
                        therapy: data
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
                    dispatch({type:DELETETHERAPY, therapy: myJson});
                    if(handleLoading){handleLoading()}
                })
            })
            .catch(err => console.log(err));
    };
};
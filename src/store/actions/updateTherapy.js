export const UPDATETHERAPY = 'UPDATETHERAPY';

export const updateTherapy = (data , handleLoading) => {

    return (dispatch, getState) => {
        const id = Object.keys(data)[0];
        getState().auth.currentUser.getIdToken(true)
            .then(idToken => {
                fetch(`https://backend-asociacion-franco-uz.vercel.app/updateTherapy/${id}`, {
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
                    console.log('RESPONSE', myJson);
                    dispatch({type: UPDATETHERAPY, therapy: myJson});
                    if(handleLoading){handleLoading()}
                })
            })
            .catch(err => console.log(err));
    };
};
export const LOADTHERAPIES = 'LOADTHERAPIES';

export const loadTherapies = (handleLoading) => {
    return (dispatch, getState) => {
        getState().auth.currentUser.getIdToken(true)
            .then(idToken => {
                fetch('http://localhost:8080/therapies', {
                    method: 'GET',
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": idToken
                    }
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
                    dispatch({type:LOADTHERAPIES, therapies: myJson.therapies});
                    if(handleLoading){handleLoading()};
                })
            })
            .catch(err => console.log(err));
    };
};
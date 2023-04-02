export const LOADLOCATIONS = 'LOADLOCATIONS';

export const loadLocations = (handleLoading) => {
    return (dispatch, getState) => {
        getState().auth.currentUser.getIdToken(true)
            .then(idToken => {
                fetch('https://backend-asociacion-franco-uz.vercel.app/locations', {
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
                    dispatch({type:LOADLOCATIONS, locations: myJson.locations});
                    if(handleLoading){handleLoading()};
                })
            })
            .catch(err => console.log(err));
    };
};
import axios from 'axios';

export const CREATELOCATION = 'CREATELOCATION';

export const createLocationWithImage = (data , handleLoading) => {
    return (dispatch, getState) => {
        getState().auth.currentUser.getIdToken(true)
            .then(idToken => {
                axios.post("http://localhost:8080/createLocationWithImage", data, { headers: {'Content-Type': 'multipart/form-data', "Authorization": idToken}})
                .then((response) => {
                    console.log('RESPONSE', response);
                    console.log(response.status);
                    if(response.status == 201 || response.status == 200){
                        console.log('Procedimiento exitoso');
                        dispatch({type:CREATELOCATION, location: response.data});
                        if(handleLoading){handleLoading()}
                    }else{
                        console.log('Ocurrió un problema, por favor intente nuevamente.');
                    }
                    return response
                })
            })
            .catch(err => console.log(err));
    };
};
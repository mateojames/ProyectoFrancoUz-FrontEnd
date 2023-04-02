import axios from 'axios';
export const UPDATELOCATION = 'UPDATELOCATION';

export const updateLocation = (data , handleLoading) => {
    return (dispatch, getState) => {
        getState().auth.currentUser.getIdToken(true)
            .then(idToken => {
                const id = data.get('id')
                axios.put(`https://backend-asociacion-franco-uz.vercel.app/updateLocation/${id}`,data, { headers: {'Content-Type': 'multipart/form-data', "Authorization": idToken}})
                .then((response) => {
                    console.log('RESPONSE', response);
                    console.log(response.status);
                    if(response.status == 201 || response.status == 200){
                        console.log('Procedimiento exitoso');
                        dispatch({type:UPDATELOCATION, location: response.data});
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
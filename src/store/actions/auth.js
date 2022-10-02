export const SETCURRENTUSER = 'SETCURRENTUSER';
export const SETLOADING = 'SETLOADING';

export const setCurrentUser = (currentUSer) => {
    return {type: SETCURRENTUSER, currentUser: currentUSer}
};

export const setLoading = () => {
    return {type: SETLOADING}
};

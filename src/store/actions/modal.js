export const SHOWMODAL = 'SHOWMODAL';
export const HIDEMODAL = 'HIDEMODAL';

export const showModal = () => {
    return {type: SHOWMODAL}
};

export const hideModal = () => {
    return {type: HIDEMODAL}
};
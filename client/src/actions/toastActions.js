import { SET_LIST, SET_TOAST } from '../constants/toastConstants'

export const setToast = (message, type='success') => dispatch => {
    
    const toast = {
        type,
        message
    }

    dispatch({
        type: SET_TOAST,
        payload: toast
    })
}

export const deleteToast = id => dispatch => {

    dispatch({
        type: SET_LIST,
        payload: id
    })
}
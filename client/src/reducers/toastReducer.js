import { SET_TOAST, SET_LIST } from '../constants/toastConstants';
import { returnToast } from '../components/Toast/toastUtils'

    export const toastReducer = (state = { toastList: [] }, action) => {
    
    switch (action.type) {
        case SET_TOAST:
            const newToast = returnToast(action.payload)
            
            return {
                toastList: [...state.toastList, newToast],
            }
        case SET_LIST:
            return {
                toastList: state.toastList.filter(toast => toast.id !== action.payload)
            }
        default:
            return state
    }
}
import axios from 'axios'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import { SET_TOAST } from '../constants/toastConstants'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_CLEAR_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_DETAILS_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_REQUEST, USER_DETAILS_RESET, USER_LIST_SUCCESS, USER_LIST_REQUEST, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_FAIL, USER_UPDATE_SUCCESS } from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/user/login', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
        dispatch({
            type: SET_TOAST,
            payload: {
                message: `Login Failed: ${error.response && error.response.data.message ? error.response.data.message : error.message}`,
                type: "error"
            }
        })
    }
}

export const logout = () => dispatch => {
    
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/user', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.msg ? error.response.data.msg : error.message
        })
     
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios(`/api/user/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.msg ? error.response.data.msg : error.message
        })

        dispatch({
            type: SET_TOAST,
            payload: {
                message: error.response && error.response.data.msg ? error.response.data.msg : error.message,
                type: "error"
            }
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/user/profile`, user, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

        dispatch({
            type: SET_TOAST,
            payload: {
                message: "Profile Updated",
                type: "success"
            }
        })

    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.msg ? error.response.data.msg : error.message
        })
    
    }
}

export const clearLoginFail = () => (dispatch) => {
    dispatch({
        type: USER_CLEAR_LOGIN_FAIL
    })
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios(`/api/user`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.msg ? error.response.data.msg : error.message
        })
        
        
        dispatch({
            type: SET_TOAST,
            payload: {
                message: "Unable to Retrieve List of Users",
                type: "error"
            }
        })
    }
}


export const delelteUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/user/${user}`, config)

        dispatch({
            type: USER_DELETE_SUCCESS
        })

    } catch (error) {

        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.msg ? error.response.data.msg : error.message
        })
        
        
        dispatch({
            type: SET_TOAST,
            payload: {
                message: "Unable to Delete User",
                type: "error"
            }
        })
    }
}

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            'Content-type': 'application/json',
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data} = await axios.put(`/api/user/${user._id}`, user, config)

        dispatch({ type: USER_UPDATE_SUCCESS })

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data})

    } catch (error) {

        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.msg ? error.response.data.msg : error.message
        })
        
        
        dispatch({
            type: SET_TOAST,
            payload: {
                message: "Unable to Delete User",
                type: "error"
            }
        })
    }
}
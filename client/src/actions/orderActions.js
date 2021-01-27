import axios from 'axios'
import { SET_TOAST } from '../constants/toastConstants'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LISTALL_FAIL, ORDER_LISTALL_REQUEST, ORDER_LISTALL_SUCCESS, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, } from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        console.log('error hear', error)
        dispatch({
            type: SET_TOAST,
            payload:
            {
                message: error.response
                    && error.response.data.msg
                    ? "Order failed, " + error.response.data.msg
                    : "Order failed, " + error.message,
                type: "error"
            }
        })
    }
}

export const getOrderDetails = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios(`/api/orders/${order}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {

        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response
                && error.response.data.msg
                ? "Order failed, " + error.response.data.msg
                : "Order failed, " + error.message,
        })

        dispatch({
            type: SET_TOAST,
            payload:
            {
                message: error.response
                    && error.response.data.msg
                    ? "Order failed, " + error.response.data.msg
                    : "Order failed, " + error.message,
                type: "error"
            }
        })
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${order}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })


    } catch (error) {

        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response
                && error.response.data.msg
                ? "Order failed, " + error.response.data.msg
                : "Order failed, " + error.message,
        })

        dispatch({
            type: SET_TOAST,
            payload:
            {
                message: error.response
                    && error.response.data.msg
                    ? "Order failed, " + error.response.data.msg
                    : "Order failed, " + error.message,
                type: "error"
            }
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios(`/api/orders/myorders`, config)
            
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })


    } catch (error) {

        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response
                && error.response.data.msg
                ? "Order failed, " + error.response.data.msg
                : "Order failed, " + error.message,
        })

        dispatch({
            type: SET_TOAST,
            payload:
            {
                message: error.response
                    && error.response.data.msg
                    ? "Order failed, " + error.response.data.msg
                    : "Order failed, " + error.message,
                type: "error"
            }
        })
    }
}

export const listAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LISTALL_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios(`/api/orders`, config)
            console.log(data)
        dispatch({
            type: ORDER_LISTALL_SUCCESS,
            payload: data
        })


    } catch (error) {

        dispatch({
            type: ORDER_LISTALL_FAIL,
            payload: error.response
                && error.response.data.msg
                ? "List All Orders Request Failed, " + error.response.data.msg
                : "List All Orders Request Failed, " + error.message,
        })

        dispatch({
            type: SET_TOAST,
            payload:
            {
                message: error.response
                    && error.response.data.msg
                    ? "List All Orders Request Failed, " + error.response.data.msg
                    : "List All Orders Request Failed, " + error.message,
                type: "error"
            }
        })
    }
}
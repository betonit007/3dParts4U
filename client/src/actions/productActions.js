import axios from 'axios'
import { SET_TOAST } from '../constants/toastConstants'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS } from '../constants/productConstants'


export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        const { data } = await axios(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listProductsDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        })

        const { data } = await axios(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProduct = id => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {

        dispatch({
            type: PRODUCT_DELETE_FAIL,
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

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products`, {}, config)  //must pass in a empty object for post request


        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
        })

    } catch (error) {

        dispatch({
            type: PRODUCT_CREATE_FAIL,
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

export const updateProduct = product => async (dispatch, getState) => {

    try {

        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/products/${product._id}`, product, config) 
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_UPDATE_FAIL
        })

        dispatch({
            type: SET_TOAST,
            payload:
            {
                message: error.response
                    && error.response.data.msg
                    ? "Product update failed, " + error.response.data.msg
                    : "Product update failed, " + error.message,
                type: "error"
            }
        })
    }


}

export const createProductReview = ( productId, review ) => async (dispatch, getState) => {

    try {

        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/products/${productId}/reviews`, review, config) 
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {

        dispatch({
            type: PRODUCT_UPDATE_FAIL
        })

        dispatch({
            type: SET_TOAST,
            payload:
            {
                message: error.response
                    && error.response.data.msg
                    ? "Product update failed, " + error.response.data.msg
                    : "Product update failed, " + error.message,
                type: "error"
            }
        })
    }


}
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { setToast } from '../actions/toastActions'
import Loader from '../components/Loader'
import ImageLoader from '../components/ImageLoader'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const PlaceOrderScreen = ({ match }) => {

    const dispatch = useDispatch()
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, success } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay  //renaming loading and success variables


    useEffect(() => {

        const addPayPalScript = async () => {
            const { data: clientId } = await axios('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || order._id !== orderId || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }


        if (success) dispatch(setToast("Congratulations! Your order is complete!"))
    }, [order, orderId, dispatch, successPay])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    return (
        loading  ? <Loader /> :
            <>
                <h1 className='text-center m-2' >Order #{order._id}</h1>
                <div className='grid grid-offset my-1'>
                    <div className='order-details-container px-1'>
                        <div className='address-'>
                            <h2 className='underline'>Shipping</h2>
                            <p>{order.user.name}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}</p>
                            <p>{order.shippingAddress.postalCode}</p>
                            <p>{order.shippingAddress.country}</p>
                        </div>
                        <div className='payment-field my-1 p-1 bg-primary border'>
                            <h2 className='underline'>Payment Method</h2>
                            <p>{order.paymentMethod}</p>
                            <strong className={!order.isPaid && 'text-error'}>
                                {!order.isPaid ? "Not Paid" : "Payment Successful!"}
                            </strong>
                        </div>
                        <div className='my-1 items-field'>
                            <h2 className='underline'>Items</h2>
                            {order.orderItems.length === 0 ?
                                <strong>Order is Empty!</strong>
                                :
                                <div>
                                    {order.orderItems.map((item, i) => (
                                        <div
                                            className='grid grid-3'
                                            key={item.product}
                                        >
                                            <div style={{ maxWidth: '100px' }}>
                                                <ImageLoader product={item} />
                                            </div>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            {item.qty} x ${item.price} = ${item.price * item.qty}

                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                    <div >
                        <div className='m0-auto p-1 bg-primary border'>
                            <h2 className='m-1 text-center underline'>Summary</h2>
                            <div className="pricing-breakdown">
                                <p><strong>Sub Total: </strong>${order.itemsPrice}</p>
                                <p><strong>Shipping: </strong>{order.shippingPrice}</p>
                                <p><strong>Tax: </strong>{order.taxPrice}</p>
                                <div className='m-1'><h3>Total: </h3><strong>${order.totalPrice}</strong></div>
                            </div>
                            {!order.isPaid &&
                                <div>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </>
    )
}

export default PlaceOrderScreen

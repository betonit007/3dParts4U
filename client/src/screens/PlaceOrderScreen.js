import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder  } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import ImageLoader from '../components/ImageLoader'

const PlaceOrderScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)

    const addDecimals = num => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // Calculate Prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

    cart.taxPrice = addDecimals(Number((0.10 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const { address, postalCode, country, city } = cart.shippingAddress
    const dispatch = useDispatch()

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }


    return (
        <div className='flex column'>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='grid grid-offset my-1'>
                <div className='order-details-container px-1'>
                    <div className='address-'>
                        <h2 className='underline'>Shipping</h2>
                        <strong>Address: </strong>
                        <p>{address}</p>
                        <p>{city}</p>
                        <p>{postalCode}</p>
                        <p>{country}</p>
                    </div>
                    <div className='payment-field my-1 p-1 bg-primary border'>
                        <h2 className='underline'>Payment Method</h2>
                        <strong>Method: </strong>{cart.paymentMethod}
                    </div>
                    <div className='my-1 items-field'>
                        <h2 className='underline'>Items</h2>
                        {cart.cartItems.length === 0 ?
                            <strong>Your Cart is Empty!</strong>
                            :
                            <div>
                                {cart.cartItems.map((item, i) => (
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
                            <p><strong>Sub Total: </strong>${cart.itemsPrice}</p>
                            <p><strong>Shipping: </strong>{cart.shippingPrice}</p>
                            <p><strong>Tax: </strong>{cart.taxPrice}</p>
                            <p ><strong className='m-1'>Total: </strong><strong>${cart.totalPrice}</strong></p>
                            <button onClick={placeOrderHandler} className='btn btn-light m-1'>Place Order</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PlaceOrderScreen

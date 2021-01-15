import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = e => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div className='flex column'>
            {/* {loading && <Loader />} */}
            <CheckoutSteps step1 step2 step3 />
            <h1 className='my-2'>Payment Method</h1>
            <form onSubmit={submitHandler} className='flex column'>
                <div className="radio-input">
                    <label htmlFor="PayPal">PayPal or Credit Card</label>
                    <input
                        id='PayPal'
                        type="radio"
                        label='PayPal or Credit Card'
                        name='paymentMethod'
                        value='PayPal'
                        className='mx-1'
                        checked
                        onChange={e => setPaymentMethod(e.target.value)}
                    />
                </div>
                <div className="radio-input">
                    <label htmlFor="Stripe">Stripe</label>
                    <input
                        id='Stripe'
                        type="radio"
                        label='Stripe or Credit Card'
                        name='paymentMethod'
                        value='Stripe'
                        className='mx-1'
                        // disabled={true}
                        onChange={e => setPaymentMethod(e.target.value)}
                    />
                </div>
                <button className='btn' type='submit'>Continue</button>
            </form>
        </div>
    )
}

export default PaymentScreen

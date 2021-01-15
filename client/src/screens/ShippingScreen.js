import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = e => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <div className='flex column'>
            {/* {loading && <Loader />} */}
            <CheckoutSteps step1 step2 />
            <h1 className='my-2'>Shipping Address</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    required={true}
                    className='input my-1'
                    placeholder='Street Address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    required={true}
                    className='input my-1'
                    placeholder='City'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />
                <input
                    type="text"
                    required={true}
                    className='input my-1'
                    placeholder='Postal Code'
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                />
                <input
                    type="text"
                    required={true}
                    className='input my-1'
                    placeholder='Country'
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
                <button className='btn' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ShippingScreen

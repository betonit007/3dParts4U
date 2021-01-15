import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {

    return (
        <nav>
            <ul className='flex'>
                <li className='mx-1'>
                    {step1 ? <Link className='text-primary' to='/login'>Login</Link> : <span>Login</span>}
                </li >
                <li className='mx-1'>
                    {step2 ? <Link className='text-primary' to='/shipping'>Shipping</Link> : <span>Shipping</span>}
                </li>
                <li className='mx-1'>
                    {step3 ? <Link className='text-primary' to='/payment'>Payment</Link> : <span>Payment</span>}
                </li>
                <li className='mx-1'>
                    {step4 ? <Link className='text-primary' to='/placeorder'>Place Order</Link> : <span>Place Order</span>}
                </li>
            </ul>
        </nav>
    )
}

export default CheckoutSteps

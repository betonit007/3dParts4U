import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ImageLoader from '../components/ImageLoader'
import { setToast } from '../actions/toastActions'
import { addToCart, removeFromCart } from '../actions/cartActions'



const CartScreen = ({ match, location, history }) => {   //location returns the query string so we can get the qty
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1 //location.search gets us the query params (everything in query string after '?').

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping') // redirect will send to login if not login
    }

    return (
        <div className='flex column'>

            {cartItems.length === 0 ? (
                <div className='flex column'>
                    <h1>Your Cart is Empty</h1>
                    <Link className='btn m-1' to='/'>Go Back</Link>
                </div>

            )
                :
                <>
                    <h1 className='underline'>Shopping Cart</h1>
                    <div className="grid">
                        <div className="flex column">
                            {cartItems.map(item => (
                                <div
                                    className='grid grid-5'
                                    key={item.product}
                                >
                                    <div style={{ maxWidth: '200px' }}>
                                        <ImageLoader product={item} />
                                    </div>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    <strong>${item.price}</strong>
                                    <select
                                        type='select'
                                        value={item.qty}
                                        onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {[...Array(item.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <i
                                        onClick={() => removeFromCartHandler(item.product)}
                                        className="fas fa-trash pointer" />
                                </div>
                            ))}
                        </div>
                        <div className='flex column'>
                            <div className="flex column border p-2 my-2">
                                <h2 className='underline'>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                <button onClick={checkoutHandler} className="btn">Checkout</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default CartScreen

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import ImageLoader from '../components/ImageLoader'
import { listProductsDetails } from '../actions/productActions'
import Loader from '../components/Loader'

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductsDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link className='btn my-1' to='/'>Go Back</Link>
            { loading ? <Loader /> :
                <div className="grid">
                    <div className="image-container">
                        <ImageLoader product={product} />
                    </div>
                    <div>
                        <div className="grid">
                            <div className="flex column">
                                <h2 className='py-1 underline w-100'>{product.name}</h2>
                                <Rating rating={product.rating} text={`${product.numReviews} Reviews`} />
                                <p>{product.description}</p>
                            </div>
                            <div className='border p-1 m0-auto'>
                                <div className='flex column'>
                                    <strong><p>Price: ${product.price}</p></strong>
                                    <p className='py-1'>Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"} </p>
                                    {product.countInStock > 0 && (
                                        <div className='flex'>
                                            <strong>Quantity: </strong>
                                            <select 
                                              type='select' 
                                              value={qty} 
                                              onChange={e=>setQty(e.target.value)}
                                              >
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                              </select>
                                        </div>
                                    )}
                                    <button 
                                      className="btn"
                                      style={{marginTop: "5px"}} 
                                      disabled={product.countInStock === 0}
                                      onClick={addToCartHandler}
                                      >
                                      Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ProductScreen

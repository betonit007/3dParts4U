import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import SelectRating from '../components/SelectRating'
import ImageLoader from '../components/ImageLoader'
import Meta from '../components/Meta'
import { listProductsDetails, createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import { setToast } from '../actions/toastActions'

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview, loading: productReviewLoading } = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(listProductsDetails(match.params.id))
    }, [dispatch, match, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = e => {
        e.preventDefault()
        if (rating === 0) {
          return dispatch(setToast("Please select a star rating.", "warning"))
        }
        dispatch(createProductReview(product._id, { rating, comment }))
        setComment("")
        setRating(0)
    }

    return (
        <>
            <Meta title={product.name} />
            <Link className='btn my-1' to='/'>Go Back</Link>
            { loading  ? <Loader /> :
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
                                                onChange={e => setQty(e.target.value)}
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
                                        style={{ marginTop: "5px" }}
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className='m-1 text-center'>Reviews ({product.reviews.length})</h2>
                        {product.reviews.length === 0 && <h3 className='text-center'>No Reviews</h3>}
                        {product.reviews.slice(0, 5).map((review, i) => (
                            <div key={i} className='my-3 underline'>
                                <strong>{review.name}</strong> <small>{new Date(review.createdAt).toLocaleDateString('en-US')}</small>
                                <Rating rating={review.rating} />
                                <small>{review.comment ? review.comment : "No Comments"}</small>
                            </div>
                        ))}
                        <div className='my-3 p-1 border' style={{ display: 'block', width: 'auto' }}>
                            {userInfo &&
                                <div >
                                    <h2 className='my-1'>Rate this Product!</h2>
                                    <form onSubmit={submitHandler}>
                                        <textarea
                                            placeholder='Enter your comment...'
                                            value={comment}
                                            className="w-100 my-1"
                                            onChange={e => setComment(e.target.value)}
                                        />
                                        <div>
                                            <SelectRating setRating={setRating} rating={rating} />
                                        </div>
                                        <button className='btn my-1' type='submit'>Submit</button>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default ProductScreen

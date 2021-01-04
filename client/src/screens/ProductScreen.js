import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { products } from '../products'

const ProductScreen = ({ match }) => {

    const product = products.find(product => product._id === match.params.id)
    console.log(product)
    return (
        <>
            <Link className='btn my-1' to='/'>Go Back</Link>
            <div className="grid">
                <div className="image-container">
                    <img src={product.image} alt={product.name} />
                </div>
                <div>
                    <div className="grid">
                        <div className="flex column">
                            <h3 className='py-1 underline'>{product.name}</h3>
                            <div className='flex'>
                                <Rating rating={product.rating} /> {product.numReviews} Reviews
                            </div>
                            <p>{product.description}</p>
                        </div>
                        <div className='flex'>
                            <div>
                                <p>Price: ${product.price}</p>
                                <p className='underline py-1'>Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"} </p>
                                <button className="btn" disabled={product.countInStock === 0}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductScreen

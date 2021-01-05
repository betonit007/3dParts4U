import {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {

    const [product, setProduct] = useState({})

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        getProduct()
    }, [match])

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
                            <h2 className='py-1 underline'>{product.name}</h2>
                            <div className='flex'>
                                <Rating rating={product.rating} /> {product.numReviews} Reviews
                            </div>
                            <p>{product.description}</p>
                        </div>
                        <div className='flex'>
                            <div>
                                <strong><p>Price: ${product.price}</p></strong>
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

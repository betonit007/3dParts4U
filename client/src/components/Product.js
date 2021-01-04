import Rating from './Rating'
import {Link} from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <div className='card product'>
            <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.description} />
            </Link>
            <h3>
                {product.name}
            </h3>
            <div >
               <Rating 
                 rating={product.rating}
                />
                <span>{product.rating} from {product.numReviews} reviews</span>
            </div>
            <h3 >${product.price}</h3>
            {/* <p>{product.description}</p> */}
        </div>
    )
}

export default Product

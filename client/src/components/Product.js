import Rating from './Rating'
import ImageLoader from './ImageLoader'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {

    return (
        <div className='card flex column'>
            <Link to={`/product/${product._id}`}>
                    <ImageLoader product={product} />
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
            </Link>
        </div>

    )
}

export default Product

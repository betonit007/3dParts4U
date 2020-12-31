
const Product = ({ product }) => {
    return (
        <div className='card product'>
            <a href={`product/${product._id}`}>
                <img src={product.image} alt={product.description} />
            </a>
            <h3>
                {product.name}
            </h3>
            <div >
                {product.rating} from {product.numReviews} reviews
            </div>
            <h3 >${product.price}</h3>
            {/* <p>{product.description}</p> */}
        </div>
    )
}

export default Product

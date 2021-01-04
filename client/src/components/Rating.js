import PropTypes from 'prop-types'

const Rating = ({ rating, numOfStars, color, text }) => {
    return (
        <div className='rating'>
            {[...Array(numOfStars)].map((star, i) => (
                <span key={i}>
                    <i style={{ color }} className={rating >= i + 1 ? 'fas fa-star' : rating >= i + 1 - .5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
                </span>
            ))}
            {text && text}
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825',
    numOfStars: 5
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired
}

export default Rating

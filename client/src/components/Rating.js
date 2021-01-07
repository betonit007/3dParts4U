//Component uses font awesome custom icons
//  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

const Rating = ({ rating, numOfStars, color, text }) => {
    
    return (
        <div className='rating w-100'>
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
    numOfStars: 5,
}

export default Rating

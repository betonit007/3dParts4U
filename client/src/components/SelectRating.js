//Component uses font awesome custom icons
//  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">


const SelectRating = ({ setRating, rating, numOfStars, color, text }) => {

    return (
        <div>
            {[...Array(numOfStars)].map((star, i) => (
                <span key={i}>
                    <i
                        onClick={() => setRating(i + 1)}
                        style={{ color, cursor: 'pointer' }}
                        className={rating >= i + 1 ? 'fas fa-star' : 'far fa-star'}
                    >

                    </i>
                </span>
            ))}
            {text &&
                <div>
                    <small>{text}</small>
                </div>
            }
        </div>
    )
}

SelectRating.defaultProps = {
    color: '#f8e825',
    numOfStars: 5,
    rating: 0,
    text: "Select number of stars..."
}

export default SelectRating
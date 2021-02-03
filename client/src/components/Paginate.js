import { Link } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {

    return (

        <div>
            {pages > 1 &&
                [...Array(pages).keys()].map((p, i) => (
                    <span
                        key={i}
                    >
                        <Link
                            className={`btn border ${i + 1 != page ? 'btn-light' : ''}`}
                            to={!isAdmin ?
                                keyword ?
                                    `/search/${keyword}/page/${p + 1}`
                                    : `/page/${p + 1}`

                                :
                                `/admin/productlist/${p + 1}`
                            }
                        >
                            {p + 1}
                        </Link>
                    </span>
                ))}
        </div>
    )
}

export default Paginate

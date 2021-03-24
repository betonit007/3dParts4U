import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Carousel from '../components/Carousel'

const HomeScreen = ({ match }) => {

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products, pages, page } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  
  return (
    <>
      <Meta />
      { loading ? <Loader />
        :
        <div className="flex column">
          {(!keyword && page === '1') ?
            <Carousel
              topProducts={products.sort((a, b) => b.rating - a.rating).slice(0, 3)}
              page={page}
            />
            :
            <Link to='/' className='mr-auto'>
              <button className="btn p-1">Go Home</button>
            </Link>
          }
          <div className="grid grid-3 my-2">
            {products.map(product => <Product key={product._id} product={product} />)}

          </div>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      }
    </>
  )
}

export default HomeScreen

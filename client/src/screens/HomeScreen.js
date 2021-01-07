import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'

const HomeScreen = () => {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  console.log(loading)
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
      {
        loading ?
          <div className='flex'>
            <img src='/images/loading.gif' alt="loading..." />
          </div>
          :
          <div className="grid grid-3 my-2">
            {products.map(product => <Product key={product._id} product={product} />)}
          </div>
      }
    </>
  )
}

export default HomeScreen

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'

const HomeScreen = () => {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList
  
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <>
          <div className="grid grid-3 my-2">
            {products?.map(product => <Product key={product._id} product={product} />)}
          </div>
    </>
  )
}

export default HomeScreen

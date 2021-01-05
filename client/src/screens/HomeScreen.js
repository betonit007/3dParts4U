import { useState, useEffect } from 'react'
import axios from 'axios'
import Product from '../components/Product'

const HomeScreen = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
      const getProducts = async () => {
          console.log('getting products')
          const { data } = await axios.get('/api/products')
          console.log(data)
          setProducts(data)
      }
      getProducts()
    }, [])

    return (
        <>
          <div className="grid grid-3 my-2">
              {products.map(product => <Product key={product._id} product={product}/>)}
          </div>
        </>
    ) 
}

export default HomeScreen

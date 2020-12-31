import React from 'react'
import Product from '../components/Product'
import { products } from '../products.js'

const HomeScreen = () => {
    return (
        <>
          <div className="grid grid-3 my-2">
              {products.map(product => <Product product={product}/>)}
          </div>
        </>
    ) 
}

export default HomeScreen

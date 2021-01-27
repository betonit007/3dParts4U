import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listProductsDetails } from '../actions/productActions'

const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    console.log(productDetails)
    const { loading, error, product } = productDetails
    console.log(product._id=== productId, product.name)
    useEffect(() => {

        if (!product.name || product._id !== productId) {
            dispatch(listProductsDetails(productId))

        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
     return 
    }, [dispatch, history, productId, product])

    const submitHandler = () => {
        console.log("submit")
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn'>Go Back</Link>

            <div className='flex column'>
                {/* { error && errorHandler()} */}

                {loading ? <Loader /> :
                    <>
                        <h1 className='my-2'>Edit Product</h1>
                        <form onSubmit={submitHandler}>

                            <input
                                type="text"
                                required={true}
                                className='input my-1'
                                placeholder='Enter Name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />

                            <input
                                type="number"
                                required={true}
                                className='input my-1'
                                placeholder='Enter Price'
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />

                            <input
                                type="text"
                                required={true}
                                className='input my-1'
                                placeholder='Image Url'
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />

                            <input
                                type="text"
                                required={true}
                                className='input my-1'
                                placeholder='Brand'
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                            />
                            <input
                                type="text"
                                required={true}
                                className='input my-1'
                                placeholder='Category'
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />

                            <input
                                type="number"
                                required={true}
                                className='input my-1'
                                placeholder='Count in stock'
                                value={countInStock}
                                onChange={e => setCountInStock(e.target.value)}
                            />
                            <input
                                type="text"
                                required={true}
                                className='input my-1'
                                placeholder='Description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <input
                                type="text"
                                required={true}
                                className='input my-1'
                                placeholder='Image Url'
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                            <button className='btn' type='submit'>Update</button>
                        </form>
                    </>
                }
            </div>
        </>


    )
}

export default ProductEditScreen

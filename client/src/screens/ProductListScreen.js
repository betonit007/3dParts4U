import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'

const UserListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const { loading, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, success:succesDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, success:successCreate } = productCreate

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, succesDelete, successCreate])

    const handleDelete = id => {

        if (window.confirm("Delete Product?")) {
           dispatch(deleteProduct(id))
        }
    }

    const handleCreate = () => {
        dispatch(createProduct())
    }

    return (
        <div className='flex column'>
            {loading || loadingDelete || loadingCreate ?
                <Loader />
                :
                <>

                    <h1 className='text-center m-3'>All Products</h1>

                    <table id="order">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                            </tr>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td><Link to={`/product/${product._id}`}>{product._id}</Link></td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <Link to={`/admin/product/${product._id}/edit`}>
                                            <i className="fas fa-edit m-1"></i>
                                        </Link>
                                        <i onClick={() => handleDelete(product._id)} className="fas fa-trash m-1 pointer" style={{ color: 'red' }}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   <div onClick={handleCreate}className='ml-auto p-1 pointer text-primary'>
                       <i className="fas fa-plus"></i> <span>Add Product</span>
                   </div>
                </>
            }
        </div>
    )
}

export default UserListScreen

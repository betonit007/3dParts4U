import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../actions/toastActions'
import Loader from '../components/Loader'
import { listAllOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderListAll = useSelector(state => state.orderListAll)
    const { loading, orders } = orderListAll
    console.log(orderListAll)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
        dispatch(listAllOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    const handleDelete = id => {

        if (window.confirm("Delete User?")) {
           console.log('yes')
        }
    }

    return (
        <div className='flex column'>
            {loading ?
               <Loader />
                :
                <div>
                    <h1 className='text-center m-3'>All User Orders</h1>
                    <table id="order">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Paid</th>
                                <th>Email</th>
                                <th>Delivered</th>
                                <th>Mark Delivered</th>
                            </tr>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td><Link to={`/order/${order._id}`}>{order._id}</Link></td>
                                    <td>{new Date(order.createdAt).toLocaleDateString('en-US')}</td>
                                    <td>{order.paymentResult && order.paymentResult.status}</td>
                                    <td><a href={`mailto:${order.paymentResult && order.paymentResult.email_address}`}>{order.paymentResult && order.paymentResult.email_address}</a></td>
                                    <td>
                                        {order.isAdmin ? <i className="fas fa-check" style={{ color: 'green' }}></i>
                                            :
                                            <i className="fas fa-times" style={{ color: '#ffcc00' }}></i>
                                        }
                                    </td>
                                    <td>
                                       <Link to={`/order/${order._id}/edit`}>
                                          <i className="fas fa-edit m-1"></i>
                                       </Link>
                                       {/* <i onClick={()=>handleDelete(order._id)}className="fas fa-trash m-1 pointer" style={{color: 'red'}}></i> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default OrderListScreen

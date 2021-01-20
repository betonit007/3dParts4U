import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../actions/toastActions'
import Loader from '../components/Loader'
import { listMyOrders } from '../actions/orderActions'

const OrderHistoryScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderListMy = useSelector(state => state.orderListMy)
    const { orders, loading: loadingOrders } = orderListMy

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            dispatch(listMyOrders())
        }
    }, [history, userInfo, dispatch])



    return (
        <div>
            {loadingOrders ?
                <Loader />
                :
                <div>
                    <h1 className='text-center m-3'>Your Orders</h1>
                    <table id="order">
                        <tbody>
                            <tr>
                                <th>Order Id</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td><Link to={`/order/${order._id}`}>{order._id}</Link></td>
                                    <td>{new Date(order.createdAt).toLocaleDateString('en-US')}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {
                                          order.paidAt ? new Date(order.paidAt).toLocaleDateString('en-US') 
                                          : 
                                          <span style={{color: 'red'}}>Not Paid</span>
                                        }
                                    </td>
                                    <td>
                                        {
                                            order.isDelivered ? new Date(order.isDelivered).toLocaleDateString('en-US') 
                                            :
                                            "Pending"
                                        }
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

export default OrderHistoryScreen


{/* <tr className='flex'>
                                <th>Order Id</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>

{orders.map(order => (
    <tr>
        <td>{order._id}</td>
        <td>{order.paidAt ? new Date(order.paidAt).toLocaleDateString('en-US') : "Not Paid"}</td>
        <td>{order.totalPrice}</td>
        <td>{order.isPaid}</td>
        <td>{order.isDelivered ? new Date(order.isDelivered).toLocaleDateString('en-US') : "Pending"}</td>
    </tr>
))} */}

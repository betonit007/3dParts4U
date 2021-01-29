import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listAllOrders, deliverOrder } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderListAll = useSelector(state => state.orderListAll)
    const { loading, orders } = orderListAll


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listAllOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDeliver])

    const handleMarkedDelivered = id => {

        if (window.confirm(`Mark order #${id} as delivered?`)) {
            dispatch(deliverOrder(id))
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
                                <th>Shipped</th>
                                <th>Recieved</th>
                            </tr>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td><Link to={`/order/${order._id}/edit`}>{order._id}</Link></td>
                                    <td>{new Date(order.createdAt).toLocaleDateString('en-US')}</td>
                                    <td>{order.paymentResult && order.paymentResult.status}</td>
                                    <td><a href={`mailto:${order.paymentResult && order.paymentResult.email_address}`}>{order.paymentResult && order.paymentResult.email_address}</a></td>
                                    <td>
                                        {order.isDelivered ? new Date(order.createdAt).toLocaleDateString('en-US')
                                            :
                                            <i className="fas fa-times" style={{ color: '#ffcc00' }}></i>
                                        }
                                    </td>
                                    <td>
                                        {/* Need to add received property to order model */}
                                        {order.isDelivered ?
                                            <p>Recieved</p>
                                            :
                                            <i
                                                onClick={() => handleMarkedDelivered(order._id)}
                                                className="fas fa-edit m-1 pointer">
                                            </i>
                                        }
                                        {/* <i onClick={()=>handleDelete(order._id)}className="fas fa-trash m-1 pointer" style={{color: 'red'}}></i> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className='text-primary my-1'>*Click Id to view individual customer order.</p>
                </div>
            }
        </div>
    )
}

export default OrderListScreen

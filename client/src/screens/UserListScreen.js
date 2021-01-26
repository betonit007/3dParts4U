import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../actions/toastActions'
import Loader from '../components/Loader'
import { listUsers, delelteUser } from '../actions/userActions'

const UserListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
        dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const handleDelete = id => {

        if (window.confirm("Delete User?")) {
            dispatch(delelteUser(id))
        }
    }

    return (
        <div className='flex column'>
            {loading ?
               <Loader />
                :
                <div>
                    <h1 className='text-center m-3'>Users</h1>
                    <table id="order">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Edit</th>
                            </tr>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td><Link to={`/user/${user._id}`}>{user._id}</Link></td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>
                                        {user.isAdmin ? <i className="fas fa-check" style={{ color: 'green' }}></i>
                                            :
                                            <i className="fas fa-times" style={{ color: '#ffcc00' }}></i>
                                        }
                                    </td>
                                    <td>
                                       <Link to={`/admin/user/${user._id}/edit`}>
                                          <i className="fas fa-edit m-1"></i>
                                       </Link>
                                       <i onClick={()=>handleDelete(user._id)}className="fas fa-trash m-1 pointer" style={{color: 'red'}}></i>
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

export default UserListScreen

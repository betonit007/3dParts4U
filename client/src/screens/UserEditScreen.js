import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id

    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [name, setName] = useState("")

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate
    console.log(successUpdate)

    const submitHandler = e => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user?.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, user, userId, successUpdate, history])

    const handleCheck = () => {  //Im not sure why but a handler must be used for checkbox instead of using setIsdmin (state)
        setIsAdmin(!isAdmin)
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn'>Go Back</Link>

            <div className='flex column'>
                {/* { error && errorHandler()} */}

                {loading || loadingUpdate ? <Loader /> :
                    <>
                        <h1 className='my-2'>Edit User</h1>
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
                                type="email"
                                required={true}
                                className='input my-1'
                                placeholder='Enter Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <div className="toggle-container">
                                <input
                                    id="admin-checkbox"
                                    type="checkbox"
                                    className="toggle"
                                    checked={isAdmin}
                                    onChange={handleCheck}
                                />
                                <label
                                    htmlFor="admin-checkbox"
                                    className="label"
                                >
                                    <div className="ball"></div>
                                </label>
                                <span>Admin</span>
                            </div>
                            <button className='btn' type='submit'>Update</button>
                        </form>
                    </>
                }
            </div>
        </>


    )
}

export default UserEditScreen

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../actions/toastActions'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            dispatch(setToast("Passwords do not match", "error"))
        }
        else {
            dispatch(updateUserProfile({ id: user._id, name, email, password}))
        }
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if ( !user || !user.name || success ) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user, success ])

    return (
        <div className='flex column'>
            {/* { error && errorHandler()} */}
            {loading && <Loader />}

            <h1 className='my-2'>User Profile</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="email"
                    required={true}
                    className='input my-1'
                    placeholder='Enter Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    required={true}
                    className='input my-1'
                    placeholder='Enter Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="password"
                    required={true}
                    className='input my-1'
                    placeholder='Enter Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    required={true}
                    className='input my-1'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <button className='btn' type='submit'>Submit</button>
            </form>

            <div className='my-2'>
                Already Registered? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Signin</Link>
            </div>

        </div>
    )
}

export default ProfileScreen

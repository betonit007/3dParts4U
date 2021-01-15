import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../actions/toastActions'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

const Loginscreen = ({ location, history }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = e => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    return (
        <div className='flex column'>
            {/* { error && errorHandler()} */}
            { error && dispatch(setToast(`Login Failed, ${error}`, 'error'))}
            {loading && <Loader />}

            <h1 className='my-2'>Sign In</h1>
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
                    type="password"
                    required={true}
                    className='input my-1'
                    placeholder='Enter Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className='btn' type='submit'>Submit</button>
            </form>

            <div className='my-2'>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </div>

        </div>
    )
}

export default Loginscreen

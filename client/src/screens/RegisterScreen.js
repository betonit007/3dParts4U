import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../actions/toastActions'
import Loader from '../components/Loader'
import { register, clearLoginFail } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            dispatch(setToast("Passwords do not match", "error"))
        }
        else { dispatch(register(name, email, password)) }
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    return (
        <div className='flex column'>
            {/* { error && errorHandler()} */}
            { error && dispatch(setToast(error, 'error'))}
            {loading && <Loader />}

            <h1 className='my-2'>Register</h1>
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

export default RegisterScreen

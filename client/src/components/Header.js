import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../actions/userActions'

const Header = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header className="navbar">
            <div className="container flex">
                <Link to='/'>
                    <h1 className="logo">UA-Systems-4U</h1>
                </Link>
                <nav>
                    <ul>
                        <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li><Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link></li>
                        {userInfo ? (
                          <div className="userContainer">
                          <li id="user-link"><Link to="#"><i className="far fa-user-circle"></i> {userInfo.name}</Link></li>
                          <div className="userMenu">
                              <li onClick={handleLogout}><i className="fas fa-sign-out-alt" ></i>Logout</li>
                              <li onClick={()=>history.push('/profile')}><i className="far fa-user"></i>Edit</li>
                          </div>
                          </div>
                        )
                        :
                        (<li><Link to="/login"><i className="fas fa-sign-in-alt"></i> Sign In</Link></li>)
                        }
                        
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
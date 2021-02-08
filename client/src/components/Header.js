import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../actions/toastActions'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = ({ match }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [ toggleUserMenu, setToggleUserMenu ] = useState(false)

    const handleLogout = () => {
        setToggleUserMenu(false)
        dispatch(logout())
        history.push('/login')
    }

    return (
        <header className="navbar">
            <div className="container flex">

                <Link to='/'>
                    <h1 className="logo">UA-Systems-4U</h1>
                </Link>
                <div style={{ flex: '2' }}>
                    <SearchBox history={history} />
                </div>
                <nav>
                    <ul>
                        <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li><Link to="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link></li>
                        {userInfo ? (
                            <div className="userContainer">
                                <li id="user-link" onClick={()=>setToggleUserMenu(!toggleUserMenu)}>
                                    <Link to="#"><i className="far fa-user-circle"></i> {userInfo.name}</Link>
                                </li>
                                <div 
                                  className={`userMenu ${toggleUserMenu ? 'show-user-menu' : ''}`}
                                  onMouseLeave={()=>setToggleUserMenu(false)}
                                >
                                    <li onClick={handleLogout}><i className="fas fa-sign-out-alt" ></i>Logout</li>
                                    <li onClick={() => history.push('/profile')}><i className="far fa-user"></i>Profile</li>
                                    <li onClick={() => history.push('/orderhistory')}><i className="fas fa-clipboard-list"></i>My Orders</li>
                                    {userInfo.isAdmin && <li onClick={() => history.push('/admin/userlist')}><i className="fas fa-users"></i>Users</li>}
                                    {userInfo.isAdmin && <li onClick={() => history.push('/admin/productlist')}><i className="fas fa-list"></i>Products</li>}
                                    {userInfo.isAdmin && <li onClick={() => history.push('/admin/orderlist')}><i className="fas fa-clipboard-list"></i>All Orders</li>}
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
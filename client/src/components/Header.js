import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
                        <li><Link to="/login"><i className="fas fa-user"></i> Sign In</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
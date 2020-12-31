import React from 'react'

const Header = () => {
    return (
        <header class="navbar">
            <div class="container flex">
                <h1 class="logo">UA-Systems-4U</h1>
                <nav>
                    <ul>
                        <li><a href="index.html"><i className="fas fa-home"></i> Home</a></li>
                        <li><a href="features.html"><i className="fas fa-shopping-cart"></i> Cart</a></li>
                        <li><a href="docs.html"><i className="fas fa-user"></i> Sign In</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header

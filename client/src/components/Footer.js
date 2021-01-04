import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer bg-dark py-5">
            <div className="container grid grid-3">
                <div>
                    <h1>UA-Systems-4U</h1>
                    <p>
                        Copyright &copy; 2021
                </p>
                </div>
                <nav>
                   <Link to='/'>Home</Link>
                </nav>
                <div className="social">
                    <Link to="#"><i className="fab fa-github fa-2x"></i></Link>
                    <Link to="#"><i className="fab fa-facebook fa-2x"></i></Link>
                    <Link to="#"><i className="fab fa-instagram fa-2x"></i></Link>
                    <Link to="#"><i className="fab fa-twitter fa-2x"></i></Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer

import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="footer bg-dark">
            <div className="container flex">
                <div className='flex column'>
                    <Link to='/'><h1>UA-Systems-4U</h1></Link>
                        Copyright &copy; 2021
                </div>
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

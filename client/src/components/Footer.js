import React from 'react'

const Footer = () => {
    return (
        <footer class="footer bg-dark py-5">
            <div class="container grid grid-3">
                <div>
                    <h1>UA-Systems-4U</h1>
                    <p>
                        Copyright &copy; 2021
                </p>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                    </ul>
                </nav>
                <div class="social">
                    <a href="#"><i class="fab fa-github fa-2x"></i></a>
                    <a href="#"><i class="fab fa-facebook fa-2x"></i></a>
                    <a href="#"><i class="fab fa-instagram fa-2x"></i></a>
                    <a href="#"><i class="fab fa-twitter fa-2x"></i></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer

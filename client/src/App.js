import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './components/HomeScreen'

import './utilities.css'
import './styles.css'

const App = () => {
    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <HomeScreen />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default App

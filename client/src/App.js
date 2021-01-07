import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Toast from './components/Toast/Toast'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

import './utilities.css'
import './styles.css'

const App = () => {
    return (
        <Router>
            <Header />
            <Toast />
            <main className="container calc-height">
                <Route path='/' exact component={HomeScreen} />
                <Route path='/product/:id' component={ProductScreen} />
                <Route path='/cart/:id?' component={CartScreen} /> {/* question mark after id makes it optional*/}
            </main>
            <Footer />
        </Router>
    )
}

export default App

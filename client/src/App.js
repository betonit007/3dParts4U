import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

import './utilities.css'
import './styles.css'

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <div className="container">
                   <Route path='/' exact component={HomeScreen} />
                   <Route path='/product/:id' component={ProductScreen} />
                </div>
            </main>
            <Footer />
        </Router>
    )
}

export default App

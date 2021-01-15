import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Toast from './components/Toast/Toast'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import Loginscreen from './screens/Loginscreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'

import './utilities.css'
import './styles.css'

const App = () => {
    return (
        <Router>
            <Header />
            <Toast />
            <main className="container calc-height">
                <Route path='/' exact component={HomeScreen} />
                <Route path='/shipping' component={ShippingScreen} />
                <Route path='/placeorder' component={PlaceOrderScreen} />
                <Route path='/payment' component={PaymentScreen} />
                <Route path='/login' component={ Loginscreen } />
                <Route path='/product/:id' component={ProductScreen} />
                <Route path='/cart/:id?' component={CartScreen} /> {/* question mark after id makes it optional*/}
                <Route path='/register' component={RegisterScreen} /> 
                <Route path='/profile' component={ProfileScreen} /> 
            </main>
            <Footer />
        </Router>
    )
}

export default App

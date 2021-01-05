const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        res.json({ msg: "Error retreiving products" })
    }

})

router.get('/:id', async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
        res.json(product)

    } catch (error) {
        res.status(404)
        throw new Error('Product not found')
    }

})

module.exports = router
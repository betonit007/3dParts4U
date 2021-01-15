const Product = require('../models/product')

const getProducts = async (req, res) => {

    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        res.json({ msg: "Error retreiving products" })
    }

}

const getProductbyId = async (req, res) => {

    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (error) {
        res.json({ msg: "Error retreiving product by id" })
    }
    
}

module.exports = { getProducts, getProductbyId }
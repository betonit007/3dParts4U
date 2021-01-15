const express = require('express')
const router = express.Router()
const { getProductbyId, getProducts } = require('../controllers/productController')

router.route('/').get(getProducts)

router.route('/:id').get(getProductbyId)

module.exports = router
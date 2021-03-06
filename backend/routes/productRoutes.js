const express = require('express')
const router = express.Router()
const { getProductbyId, getProducts, deleteProductById, updateProduct, createProduct, createProductReview, getTopRatedProducts } = require('../controllers/productController')
const { protect, isAdmin } = require('../middleware/authMiddleware')

router.route('/')
    .post(protect, isAdmin, createProduct)
    .get(getProducts)

router.route('/:id/reviews').post(protect, createProductReview)

router.get('/top', getTopRatedProducts)

router.route('/:id').get(getProductbyId)

router.route('/:id')
    .delete(protect, isAdmin, deleteProductById)
    .put(protect, isAdmin, updateProduct)

module.exports = router
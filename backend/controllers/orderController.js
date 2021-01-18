const Order = require('../models/order')

const addOrderItems = async (req, res) => {

   const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

   if (orderItems && orderItems === 0) {
       res.status(400).json({msg: "No order items"})
   } else {
       const order = new Order({
        user: req.user._id,
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
       })

       const createdOrder = await order.save()

       res.status(201).json(createdOrder)
   }

}

module.exports = { addOrderItems }
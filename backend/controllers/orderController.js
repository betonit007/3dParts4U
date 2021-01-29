const Order = require('../models/order')

const addOrderItems = async (req, res) => {

    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems === 0) {
        res.status(400).json({ msg: "No order items" })
    } else {

        try {

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

        } catch (error) {
            res.status(402).json({ msg: "No Payment Method" })
        }

    }

}

const getOrderById = async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404).json({ msg: "Order not found" })
    }

}

const updateOrderToPaid = async (req, res) => {

    const order = await Order.findById(req.params.id)

    try {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.status(200).json(updatedOrder)

    } catch (error) {
        res.status(404).json({ msg: "Order not found" })
    }



}

const updateOrderToDelivered = async (req, res) => {
    console.log(req.params.id)
    const order = await Order.findById(req.params.id)

    try {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.status(200).json(updatedOrder)

    } catch (error) {
        res.status(404).json({ msg: "Order not found" })
    }



}

const getMyOrders = async (req, res) => {

    try {
        const order = await Order.find({ user: req.user._id })
        res.status(200).json(order)

    } catch (error) {
        res.status(404).json({ msg: "Orders not found" })
    }
}


const getOrders = async (req, res) => {

    try {
        const order = await Order.find({}).populate('user', 'id name')
        res.status(200).json(order)

    } catch (error) {
        res.status(404).json({ msg: "Orders not found" })
    }
}

module.exports = { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered }
const moment = require('moment');

exports.checkoutOrder = (req, res) => {
    try{
        const totalPrice = req.body.reduce((prev, curr) => {
            prev += curr.total_price
            return prev
        }, 0)
    
        const order = {}
        order.items = req.body
        order.total = totalPrice
        order.created_at = moment().toDate()
        res.send(order)
    } catch(err){
        console.log(err)
        res.send("An error occured")
    }  
}

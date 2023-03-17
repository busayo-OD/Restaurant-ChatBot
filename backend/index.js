const express = require('express');


const ItemRouter = require('./routes/itemRoutes')
const OrderRouter = require('./routes/orderRoutes')
const cors = require('cors');

const PORT = 5000

const app = express()

app.use(express.json());
app.use(cors());

app.use('/items', ItemRouter)
app.use('/orders', OrderRouter)

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
}) 
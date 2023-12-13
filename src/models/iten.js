const mongoose = require('mongoose')

const itensSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    imgPath: { type: String, required: true },
    type: { type: String, required: true }

})

module.exports = mongoose.model('Iten', itensSchema)
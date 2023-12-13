
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrinho',
        required: true

    },
    valueTotal: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model("Recibo", receiptSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true

  },
  iten: [
    {
      identifier: { type: mongoose.Schema.Types.ObjectId, ref: "Iten" },
      amount: { type: Number }
    }]
})

module.exports = mongoose.model("Carrinho", CartSchema);

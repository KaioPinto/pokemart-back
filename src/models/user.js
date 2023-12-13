const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    pass: { type: String, required: true, unique: true },
    historic: [{
        iten: { type: String },
        valueTotal: { type: Number },
        timestamp: { type: Date, default: Date.now }
    }],

    profile: { type: String, maxlenght: 1000 },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Iten' }]
})

userSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.pass, 10);
    this.pass = hash;
    next();
});

module.exports = mongoose.model('User', userSchema)
const cartModel = require('../models/cart')

exports.findCartRepository = async (_idUser) => {
    return cartModel.findOne({ user: _idUser }).populate({
        path: 'iten',
        populate: {
            path: 'identifier',
        }
    }).select('-__v')
}

exports.saveCartRepository = async ({ idIten, _idUser }) => {
    return findCart.save()
}
exports.createCarrinhoRepository = async (_idUser) => {
    return cartModel.create({ user: _idUser })
}
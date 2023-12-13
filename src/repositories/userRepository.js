const userModel = require('../models/user')
const receipt = require('../models/receipt')



exports.createUserRepository = async ({ name, user, email, pass }) => {
    return userModel.create({ name, user, email, pass })
}
exports.findUserRepository = async (email) => {
    return userModel.findOne({ email: email })
}
exports.findByIdUserRepository = async (_idUser) => {
    return userModel.findById(_idUser)

}

exports.savePicture = async (picture, _idUser) => {
    return await userModel.updateOne(
        { _id: _idUser },
        { $set: { profile: picture } }
    );

}
exports.deleteUserRepository = async (id) => {
    return userModel.findByIdAndDelete(id)
}
exports.userBuyRepository = async ({ findCart, total, _idUser }) => {
    const recibo = await receipt.create({ cart: findCart, valueTotal: total })
    const user = await userModel.findById({ _id: _idUser })
    let compras = ''
    findCart.iten.forEach(item => {
        compras += item.identifier.name + '- ' + item.amount + ', '
    });

    await userModel.updateOne(
        { _id: _idUser },
        {
            $push: {
                historic: {
                    iten: compras,
                    valueTotal: total,
                    timestamp: new Date()
                }
            }
        }
    );
    findCart.iten = []
    findCart.save()

    return recibo

}
exports.findHistoric = async (_idUser) => {
    return userModel.findOne({ _id: _idUser }).select('historic')

}

exports.addFavoritesRepository = async (_idUser, idIten) => {



    

    return await userModel.updateOne(
        { _id: _idUser },
        {
            $push: {
                favorites:
                    idIten

            }
        }
    );

}
exports.favoritesRepository = async (_idUser) => {
    return userModel.findOne({ _id: _idUser }).select('favorites').populate('favorites')

}

exports.removeFavoritesRepository = async (_idUser, idIten) => {
    return await userModel.updateOne(
        { _id: _idUser },
        {
            $pull: {
                favorites:
                    idIten

            }
        }
    );
}
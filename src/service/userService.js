const userRepository = require('../repositories/userRepository')
const carrinhoRepository = require('../repositories/cartRepository')
const itenRepository = require('../repositories/itenRepository')
const AppError = require('../errors/AppError')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secret = process.env.SECRET;

exports.loginUserService = async ({ email, pass }) => {
    if (!email || !pass) {
        throw new AppError('Submit all fields for registration', 400);
    }

    const user = await userRepository.findUserRepository(email)
    if (!user) {
        throw new AppError('User does not exist', 400);
    }
    const _id = user._id.toHexString()
    if (!(await bcrypt.compare(pass, user.pass))) {
        throw new AppError('invalid password', 400);

    }


    const token = jwt.sign({ id: _id }, secret, { expiresIn: 86400, })

    return { token, user: user.user };

}

exports.sendPictureService = async (picture, _idUser) => {
    if (!picture) {
        throw new AppError("picture dont send")
    }

    return userRepository.savePicture(picture, _idUser)

}
exports.getPictureService = async (_idUser) => {
    return userRepository.findByIdUserRepository(_idUser)
}

exports.createUserService = async ({ name, user, email, pass }) => {
    if (!name || !user || !email || !pass) {
        throw new AppError('Submit all fields for registration', 400);
    }
    if (await userRepository.findUserRepository(email)) {
        console.log(email)
        throw new AppError("User already exist!", 400)
    }
    const newUser = await userRepository.createUserRepository(
        {
            name, user, email, pass
        }
    )
    return newUser
}


exports.findByIdService = async (id) => {

    if (!id) {
        throw new AppError('Submit all fields for registration', 400);
    }
    const user = await userRepository.findByIdUserRepository(id)

    if (!user) {
        throw new AppError('User does not exist', 400);

    }
    return user

}

exports.deleteUserService = async (id) => {
    if (!id) {
        throw new AppError('Submit all fields for registration', 400);
    }

    const deleteUser = await userRepository.deleteUserRepository(id)
    if (!deleteUser) {
        throw new AppError('User does not exist', 400);

    }
    return deleteUser

}


exports.productBuyService = async (_idUser) => {
    const findCart = await carrinhoRepository.findCartRepository(_idUser)
    if (!findCart || findCart.iten.length === 0) {
        throw new AppError('cart does not exist', 400);
    }

    let total = 0;
    findCart.iten.forEach((x) => {
        const productValue = Number(x.identifier.price);
        const productTotal = x.amount * productValue;
        total += productTotal;
    }
    )

    const buy = await userRepository.userBuyRepository({ findCart, total, _idUser })
    return buy
}


exports.historicService = async (_idUser) => {

    const historc = await userRepository.findHistoric(_idUser)

    if (historc.historic.length <= 0) {
        throw new AppError('historic does not exist', 400);
    }

    return historc.historic
}
exports.removeProductService = async ({ idIten, _idUser }) => {
    if (!idIten) {
        throw new AppError('Submit all field', 400);
    }
    const findCarrinho = await carrinhoRepository.findCartRepository(_idUser)
    if (!findCarrinho) {
        throw new AppError("cart does not exists", 400);
    }
    if (findCarrinho.iten.length === 0) {
        throw new AppError('cart is empty', 400);

    }
    const itenRemove = findCarrinho.iten.find(item => {
        if (idIten === item.identifier._id.toHexString()) {
            return true;
        }
    });

    if (itenRemove.amount > 1) {
        itenRemove.amount -= 1;
    } else {
        findCarrinho.iten.pull({ identifier: idIten });

    }
    findCarrinho.save()
    const returnCart = await carrinhoRepository.findCartRepository(_idUser)


    return returnCart
}

exports.addProductService = async ({ _idUser, idIten }) => {
    const findIten = await itenRepository.findByIdItenRepository(idIten)
    if (!findIten) {
        throw new AppError('iten does not exist', 400);
    }
    const findCart = await carrinhoRepository.findCartRepository(_idUser)
    if (!findCart) {
        const newCart = await carrinhoRepository.createCarrinhoRepository(_idUser)
        newCart.iten.push({ identifier: idIten, amount: 1 });
        await newCart.save()
        const findCartim = await carrinhoRepository.findCartRepository(_idUser)
        return findCartim
    }
    const itenAdd = findCart.iten.find((x) => x.identifier._id.toHexString() === idIten);
    if (!itenAdd) {
        findCart.iten.push({ identifier: idIten, amount: 1 });
    } else {
        itenAdd.amount += 1
    }
    await findCart.save();
    const findCartAtt = await carrinhoRepository.findCartRepository(_idUser);

    return findCartAtt

}
exports.findCartService = async (_idUser) => {
    const cart = carrinhoRepository.findCartRepository(_idUser)
    if (!cart) {
        throw new AppError('cart does not exist')
    }
    return cart

}

exports.addFavoritesService = async (_idUser, idIten) => {
    const userFavorites = await userRepository.favoritesRepository(_idUser);
    const itenExist = userFavorites.favorites.find((favorite) => favorite._id.toHexString() === idIten);
    if (itenExist) {
        throw new AppError("already exist")
    }

    const result = await userRepository.addFavoritesRepository(_idUser, idIten);

    return { success: true, message: 'Item added to favorites' };
};

exports.getFavoritesService = async (_idUser) => {
    const favorites = await userRepository.favoritesRepository(_idUser)
    return favorites

}
exports.removeFavoritesService = async (_idUser, idIten) => {
    return userRepository.removeFavoritesRepository(_idUser, idIten)
}
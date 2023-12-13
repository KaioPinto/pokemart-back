const userService = require('../service/userService')



exports.createUser = async (req, res, next) => {

    console.log(req.body)
    try {
        const result = await userService.createUserService(req.body)
        res.status(201).json({message: "User created"})
    }
    catch (error) {
        next(error)
    }

}

exports.loginUser = async (req, res, next) => {
    try {
        const result = await userService.loginUserService(req.body)
        res.status(201).json({ message: "Usuário logado com sucesso", userData: { token: result.token, name: result.user } })

    }
    catch (error) {
        next(error)
    }

}

exports.deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUserService(req.params.id)
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }

}
exports.findById = async (req, res, next) => {

    try {
        const _idUser = req.userId
        const result = await userService.findByIdService(_idUser)
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }
}
exports.sendPicture = async (req, res, next) => {
    try {
        const _idUser = req.userId
        const picture = req.body.img
        const result = await userService.sendPictureService(picture, _idUser)
        res.status(200).json(result)

    } catch (error) {
        next(error)

    }

}

exports.productBuy = async (req, res, next) => {
    try {
        const _idUser = req.userId
        const result = await userService.productBuyService(_idUser)
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }


}

exports.getHistoric = async (req, res, next) => {

    try {
        const _idUser = req.userId
        const result = await userService.historicService(_idUser)
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }


}
exports.removeProduct = async (req, res, next) => {
    try {
        const idIten = req.body._id
        const _idUser = req.userId
        const result = await userService.removeProductService({ idIten, _idUser })
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }
}

exports.addIten = async (req, res, next) => {

    try {
        const _idUser = req.userId
        const idIten = req.body._id
        const result = await userService.addProductService({ _idUser, idIten })
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }


}
exports.getPicture = async (req, res, next) => {
    try {
        const _idUser = req.userId
        const result = await userService.getPictureService(_idUser)
        res.status(200).json(result)


    } catch (error) {
        next(error)

    }
}
exports.findCartController = async (req, res, next) => {
    try {
        const _idUser = req.userId
        const result = await userService.findCartService(_idUser)
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }

}

exports.getFavorites = async (req, res, next) => {
    
    try {
        const _idUser = req.userId
        const result = await userService.getFavoritesService(_idUser)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

exports.addFavorites = async (req, res, next) => {
    try {
        const _idUser = req.userId
        const idIten = req.body._id
        const result = await userService.addFavoritesService(_idUser, idIten)
        res.status(200).json(result)
        
    } catch (error) { 
        next(error)

    }
}

exports.removeFavorites = async (req, res, next) => {
    try {
        const _idUser = req.userId
        const idIten = req.body._id
        const result = await userService.removeFavoritesService(_idUser, idIten)
        res.status(200).json(result)
    } catch (error) {
        next(error)

    }
}
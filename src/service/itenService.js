const itenRepository = require('../repositories/itenRepository')
const AppError = require('../errors/AppError')


exports.createItenService = async ({ name, description, imgPath, type, price, amount }) => {

    if (!name || !description || !imgPath || !type ||
        !price || !amount)
        throw new AppError('Submit all fields for registration', 400);

    const iten = await itenRepository.createItenRepository(
        {
            name, description, imgPath, type, price, amount
        }
    )

    return iten

}



exports.findByIdItemService = async (id) => {
    const iten = await itenRepository.findByIdItenRepository(id)

    if (!iten) {
        throw new AppError('The iten does not exist')
    }

    return iten

}


exports.findBytypeService = async (type) => {
    const iten = await itenRepository.findByTypeItenRepository(type)
    if (!iten) {
        throw new AppError('The iten does not exist')
    }

    return iten
}

exports.findByNameService = async (name) => {
    const iten = await itenRepository.findByNameItenRepository(name)
    if (!iten) {
        throw new AppError('The iten does not exist')
    }
    return iten

}


exports.deleteByIdItenService = async (id) => {
    const iten = await itenRepository.deleteByIdItenRepository(id)
    if (!iten) {
        throw new AppError('The iten does not exist')
    }

    return iten

}
exports.findAllService = async () => {
    const iten = await itenRepository.findItenRepository()
    if (!iten) {
        throw new AppError('The iten does not exist')
    }
    return iten
}


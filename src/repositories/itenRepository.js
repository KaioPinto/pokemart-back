const itenModel = require('../models/iten')


const createItenRepository = ({ name, description, imgPath, type, price, amount }) => {
    return itenModel.create({ name, description, imgPath, type, price, amount })
}


const findByIdItenRepository = (id) => {
    return itenModel.findById(id)

}

const findByTypeItenRepository = (type) => {

    return itenModel.findOne({ type: type })
}

const findByNameItenRepository = (name) => {
    return itenModel.findOne({ name: name })

}

const deleteByIdItenRepository = (id) => {
    return itenModel.deleteOne({ _id: id })
}

const findItenRepository = () => {
    return itenModel.find()
}

module.exports = { findItenRepository, createItenRepository, findByIdItenRepository, findByTypeItenRepository, findByNameItenRepository, deleteByIdItenRepository }
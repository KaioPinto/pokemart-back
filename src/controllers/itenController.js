const itenService = require('../service/itenService')



exports.createIten = async (req, res, next) => {

    try {
        
        const result = await itenService.createItenService(req.body)
        res.status(201).json(result)
    }
    catch (error) {
        next(error)
    }

}

exports.deleteIten = async (req, res, next) => {
    try {
        const result = await itenService.deleteByIdItenService(req.params.id)
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }

}

exports.findAll = async (req, res, next) => {
    try {
        const result = await itenService.findAllService()
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }

}

exports.findByName = async (req, res, next) => {
    try {
        const result = await itenService.findByNameService(req.body.name)
        res.status(200).json(result)

    }
    catch (error) {
        next(error)
    }

}

exports.findByType = async (req, res, next) => {
    try {
        const result = await itenService.findBytypeService(req.body.type)
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }

}


exports.findById = async (req, res, next) => {

    try {
        const result = await itenService.findById(req.params.id)
        res.status(200).json(result)
    }
    catch (error) {
        next(error)
    }



}

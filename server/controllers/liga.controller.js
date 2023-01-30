const ligaService  = require('../services/liga.service')
const ApiError = require(`../errors/api.error`)

class ligaController{
    async create(req, res, next){//TODO: add сhannelId
        try{
            const {name, level} = req.body
            if(!name || !level ){
                return next(ApiError.badRequest('!name || !level'))
            }
            const liga = await ligaService.create(name, level)

            return res.json({liga})
        }catch (e) {
            next(e)
        }
    }

    async getLigaById(req, res, next){//TODO: add сhannelId
        try{
            const {ligaId} = req.body
            if(!ligaId ){
                return next(ApiError.badRequest('!ligaId'))
            }
            const liga = await ligaService.getLigaById(ligaId)

            return res.json({liga})
        }catch (e) {
            next(e)
        }
    }

    async delete(req, res, next){
        try{
            const {ligaId} = req.body
            if(!ligaId){
                return next(ApiError.badRequest('!ligaId'))
            }
            const team = await ligaService.delete( ligaId)

            return res.json({team})
        }catch (e) {
            next(e)
        }
    }

    async redact(req, res, next){
        try{
            const {ligaId, data} = req.body
            if(!ligaId || !data){
                return next(ApiError.badRequest('!ligaId || !data'))
            }
            const team = await ligaService.redact(ligaId, data)

            return res.json({team})
        }catch (e) {
            next(e)
        }
    }

    async findAll(req, res, next){
        try{
            const teams = await ligaService.findAll()

            return res.json({teams})
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new ligaController()
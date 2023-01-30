const teamService  = require('../services/team.service')
const ApiError = require(`../errors/api.error`)

class teamController{
    async create(req, res, next){
        try{
            const {name, ligaId} = req.body
            if(!name || !ligaId){
                return next(ApiError.badRequest('!name || !ligaId'))
            }
            const team = await teamService.create(name, ligaId)

            return res.json({team})
        }catch (e) {
            next(e)
        }
    }

    async delete(req, res, next){
        try{
            const {teamId} = req.body
            if(!teamId){
                return next(ApiError.badRequest('!teamId'))
            }
            const team = await teamService.delete( teamId)

            return res.json({team})
        }catch (e) {
            next(e)
        }
    }
    async findByLigaId(req, res, next){
        try{
            const {ligaId} = req.body
            if(!ligaId){
                return next(ApiError.badRequest('!ligaId'))
            }
            const team = await teamService.findByLigaId( ligaId)

            return res.json({team})
        }catch (e) {
            next(e)
        }
    }


    async findTeamsByLigaId(req, res, next){
        try{
            const {ligaId} = req.body
            if(!ligaId){
                return next(ApiError.badRequest('!ligaId'))
            }
            const teams = await teamService.findTeamsByLigaId(ligaId)

            return res.json({teams})
        }catch (e) {
            next(e)
        }
    }
    async findTeamById(req, res, next){
        try{
            const {id} = req.body
            if(!id){
                return next(ApiError.badRequest('!id'))
            }
            const teams = await teamService.findTeamById(id)

            return res.json({teams})
        }catch (e) {
            next(e)
        }
    }
    async redact(req, res, next){
        try{
            const {teamId, data} = req.body
            if(!teamId || !data){
                return next(ApiError.badRequest('!teamId || !data'))
            }
            const team = await teamService.redact(teamId, data)

            return res.json({team})
        }catch (e) {
            next(e)
        }
    }

    async findAll(req, res, next){
        try{
            const teams = await teamService.findAll()

            return res.json({teams})
        }catch (e) {
            next(e)
        }
    }

}

module.exports = new teamController()
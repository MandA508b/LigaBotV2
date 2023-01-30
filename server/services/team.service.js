const Team = require('../../models/team.model')

class teamController{

    async findByLigaId(ligaId){
        const teams = Team.findAll({ligaId})
        return teams
    }
    async findTeamsByLigaId(ligaId){
        const teams = await Team.find({ligaId})
        return teams
    }
    async findTeamById(id){
        const team = await Team.findById(id)
        return team
    }
    async create(name, ligaId){
        const team = await Team.create({name, ligaId})

        return team
    }

    async delete(teamId){
        const team = await Team.findByIdAndDelete(teamId)

        return team
    }

    async redact(teamId, data){
        const team = await Team.findByIdAndUpdate(teamId, data)

        return team
    }

    async findAll(){
        const teams = await Team.find()

        return teams
    }

}

module.exports = new teamController()
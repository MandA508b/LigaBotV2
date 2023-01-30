const Liga = require('../../models/liga.model')
const User = require('../../models/user.model')
const Team = require('../../models/team.model')

class ligaController{// userData: [{userId: _id, updateData: {..data to update..}}, ...]
    async create(name, level){
        const team = await Liga.create({name, level})

        return team
    }

    async getLigaById(ligaId){
        const liga = await Liga.findById(ligaId)
        return liga
    }

    async delete(ligaId){
        const liga = await Liga.findByIdAndDelete(ligaId)
        await User.updateMany({ligaId}, {ligaId: "000000000000000000000000"})
        await Team.updateMany({ligaId}, {ligaId: "000000000000000000000000"})

        return liga
    }

    async redact(ligaId, data){
        console.log(ligaId, data)
        const team = await Liga.findByIdAndUpdate(ligaId, data)

        return team
    }

    async findAll(){    
        const ligas = await Liga.find()

        return ligas
    }
}

module.exports = new ligaController()
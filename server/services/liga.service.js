const Liga = require('../../models/liga.model')

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
        const team = await Liga.findByIdAndDelete(ligaId)

        return team
    }

    async redact(ligaId, data){
        console.log(ligaId, data)
        const team = await Liga.findByIdAndUpdate(ligaId, data)

        return team
    }

    async findAll(){    
        const teams = await Liga.find()

        return teams
    }
}

module.exports = new ligaController()
const Advertisement = require('../../models/advertisement.model')
const {configureStore} = require("@reduxjs/toolkit");

class advertisementController{

    async create(userId,leagueId,type,cityId,total,part,rate,deadline,extraInfo){
        const Advertisements = await Advertisement.find()
        const number = Advertisements.length+1
        const advertisement = await Advertisement.create({number,userId,leagueId,type,cityId,total,part,rate,deadline,extraInfo})

        return advertisement
    }

    async delete(advertisementId){
        const advertisement = await Advertisement.findByIdAndDelete(advertisementId)

        return advertisement
    }

    async redact(advertisementId, data) {
        const advertisement = await Advertisement.findByIdAndUpdate(advertisementId, data)

        return advertisement
    }

    async findAll(){
        const advertisements = await Advertisement.find()

        return advertisements
    }

    async getAllByTelegramId(telegramId){
        console.log(telegramId)
        const advertisements = await Advertisement.find({telegramId})

        return advertisements
    }
    async getById(advertisementId){
        const advertisement = await Advertisement.findById(advertisementId)

        return advertisement
    }

    async deleteByNumber(number){
        const advertisement = await Advertisement.deleteOne({number})

        return advertisement
    }

}

module.exports = new advertisementController()
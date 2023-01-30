const db= require('../db/db')

const schema = new db.Schema({
    status: {
        type: Boolean,
        default: false
    },
    number: {
        type: Number,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    leagueId:{
        type: db.Schema.Types.ObjectId,
        required:true
    },
    type: {
        type: String,
        required: true
    },
    cityId:{
        type: db.Schema.Types.ObjectId,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    part: {
        type: Number,
        default: 0
    },
    rate:{
        type: Number,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    extraInfo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = db.model('Advertisement', schema)

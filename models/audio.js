const mongoose = require('mongoose')
const audioSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    _ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    size:{
        type: Number,
        required: true
    },
    type:{
        type:String,
        required:true
    },
    location:{
        type: String,
        required:true,
    },
    link:{
        type:String,
        required:true
    }


},{
    timestamps: true
})

const Audio = new mongoose.model('Audio', audioSchema)

module.exports = Audio
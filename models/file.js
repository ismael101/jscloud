const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    _ownerid:{
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
    }

},{
    timestamps: true
})

const File = new mongoose.model('File', fileSchema)

module.exports = File

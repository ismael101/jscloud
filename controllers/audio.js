const mongoose = require('mongoose')
const formidable = require('formidable')
const fs = require('fs')
const Audio = require('../models/audio')

exports.getAudioInfo = (req,res,next) => {
    Audio.find({_ownerId: req.userid})
        .then(audios => {
            res.status(200).json({audios:audios})
        })
        .catch(err => {
            res.status(400).json({error:'Booyaka'})
        })
}

exports.getAudio = (req,res,next) => {
    Audio.findById(req.params.id)
        .then(audio => {
            res.download(audio.location)
        })
        .catch(err => {
            res.status(400).json({error:err})
        })
}
exports.createAudio = (req,res,next) => {    

        const form = new formidable.IncomingForm()
        form.uploadDir = `./uploads/audio`
        form.keepExtensions = true
        form.multiples = true
        form.parse(req, (err, fields, files) => {
            if(err){
                res.status(400).json({
                    message:'Error Uploading File(s)',
                    error:err
                })
            
            }
            if(Array.isArray(files.file)){
                files.file.forEach(file => {
                    let id = new mongoose.Types.ObjectId()
                    let newAudio = new Audio({
                        _id: id,
                        _ownerId: req.userid,
                        type: file.type,
                        name: file.name,
                        size: file.size,
                        location: file.path,
                        link: `http://localhost:3000/audios/${id}`
                    })
    
                    newAudio.save()
                            .then(() => {
                               console.log('Audio Added')
                            })
                            .catch(err => {
                                res.status(400).json({error:err})
                            })
                
                })
            }else{
                let file = files.file
                let id = new mongoose.Types.ObjectId()
                    let newAudio = new Audio({
                        _id: id,
                        _ownerId: req.userid,
                        type: file.type,
                        name: file.name,
                        size: file.size,
                        location: file.path,
                        link: `http://localhost:3000/audios/${id}`
                    })
    
                    newAudio.save()
                            .then(() => {
                               console.log('Audio Added')
                            })
                            .catch(err => {
                                res.status(400).json({error:err})
                            })
            }
                res.status(200).json({
                    message:'Audio Uploaded',
                })
        
        })

}

exports.deleteAudio = (req,res,next) => {
    Audio.findById(req.params.id)
        .then(audio => {
            fs.unlink(audio.location, (err) => {
                if(err){
                    res.status(400).json({error:err})
                }
                Audio.findByIdAndDelete(req.params.id)
                    .then(() => {
                        res.status(200).json({message:'Audio Deleted'})
                    })
                    .catch(err => {
                        res.status(400).json({error:err})
                    })
            })
        })
        .catch(err => {
            res.status(400).json({error:err})

        })
    
}
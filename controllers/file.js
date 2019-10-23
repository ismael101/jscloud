const mongoose = require('mongoose')
const fs = require('fs')
const File = require('../models/file')

exports.getFileInfo = (req,res,next) => {
    File.find({_ownerid: req.userid})
        .then(files => {
            res.status(200).json({files:files})
        })
        .catch(err => {
            res.status(400).json({error:err})
        })
}
exports.getFile = (req,res,next) => {
    File.findById(req.params.id)
        .then(file => {
            res.download(file.location)
        })
        .catch(err => {
            res.status(400).json({error:err})

        })
}
exports.createFile = (req,res,next) => { 
    try{
        files = []
        req.files.forEach(file => {
            let newid = new mongoose.Types.ObjectId()
            let filedata = {
                _id:newid,
                _ownerid: req.userid,
                name: file.originalname,
                size: file.size,
                type: file.mimetype,
                location: file.path
            } 
            let newfile = new File(filedata)
            files.push(filedata)
            newfile.save()
        });
        res.status(200).json({
            message:'File(s) Uploaded',
            files:files
        })
    }   
    catch(err){
        res.status(400).json({
            error:err
        })
    }
    
}

exports.deleteFile = (req,res,next) => {
    File.findById(req.params.id)
        .then(file => {
            fs.unlink(file.location, (err) => {
                if(err){
                    res.status(400).json({error:err})
                }
                File.findByIdAndDelete(req.params.id)
                    .then(() => {
                        res.status(200).json({message:'File Deleted'})
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